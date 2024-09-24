import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import { useToast } from "@/hooks/use-toast";

interface SignatureFieldProps {
  onChange: (signatureData: string | null) => void;
  value: string | null;
  width: number;
  height: number;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ onChange, value, width, height }) => {
  const [mode, setMode] = useState<"draw" | "type" | "upload">("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();

  useEffect(() => {
    if (value) {
      if (value.startsWith('data:image')) {
        setMode("draw");
        if (signatureCanvasRef.current) {
          signatureCanvasRef.current.fromDataURL(value);
        }
      } else if (value.startsWith('http')) {
        setMode("upload");
        setUploadedSignature(value);
      } else {
        setMode("type");
        setTypedSignature(value);
      }
    } else {
      handleClear();
    }
  }, [value]);

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
    setTypedSignature("");
    setUploadedSignature(null);
    onChange(null);
  };

  const uploadToEdgeStore = async (data: string | Blob) => {
    setIsUploading(true);
    try {
      let file: File;
      if (typeof data === 'string') {
        // Convert base64 to blob
        const response = await fetch(data);
        const blob = await response.blob();
        file = new File([blob], "signature.png", { type: "image/png" });
      } else {
        file = new File([data], "signature.png", { type: "image/png" });
      }

      const res = await edgestore.publicImages.upload({
        file,
        input: { type: "signature" },
        onProgressChange: (progress: number) => {
          console.log(progress);
        },
      });
      setUploadedSignature(res.url);
      onChange(res.url);
      toast({
        title: "Upload Successful",
        description: "Your signature has been uploaded successfully.",
        variant: "success",
      });
      return res.url;
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your signature. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    let signatureData: string | null = null;
    switch (mode) {
      case "draw":
        signatureData = signatureCanvasRef.current?.toDataURL() || null;
        break;
      case "type":
        // Create a canvas element to render the typed signature
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.font = '30px Arial';
          ctx.fillText(typedSignature, 10, 50);
          signatureData = canvas.toDataURL();
        }
        break;
      case "upload":
        signatureData = uploadedSignature;
        break;
    }
    if (signatureData) {
      const uploadedUrl = await uploadToEdgeStore(signatureData);
      onChange(uploadedUrl);
    }
  };

  const handleDraw = () => {
    if (signatureCanvasRef.current) {
      const signatureData = signatureCanvasRef.current.toDataURL();
      onChange(signatureData);
    }
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTypedSignature(newValue);
    onChange(newValue);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadToEdgeStore(file);
    }
  };

  return (
    <div className="border p-4 rounded-md bg-white">
      <div className="mb-4">
        <Button
          type="button"
          onClick={() => setMode("draw")}
          variant={mode === "draw" ? "default" : "outline"}
          className="mr-2"
        >
          Draw
        </Button>
        <Button
          type="button"
          onClick={() => setMode("type")}
          variant={mode === "type" ? "default" : "outline"}
          className="mr-2"
        >
          Type
        </Button>
        <Button
          type="button"
          onClick={() => setMode("upload")}
          variant={mode === "upload" ? "default" : "outline"}
        >
          Upload
        </Button>
      </div>

      {mode === "draw" && (
        <SignatureCanvas
        ref={signatureCanvasRef}
        canvasProps={{
          width: width,
          height: height,
          className: "border rounded-md",
        }}
      />

      
      )}

      {mode === "type" && (
        <input
          type="text"
          value={typedSignature}
          onChange={handleType}
          className="w-full p-2 border rounded-md"
          placeholder="Type your signature"
        />
      )}

      {mode === "upload" && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="mb-2"
            disabled={isUploading}
          />
          {isUploading && <p>Uploading...</p>}
          {uploadedSignature && (
            <Image
              src={uploadedSignature}
              alt="Uploaded Signature"
              className="max-w-full h-auto"
              width={100}
              height={20}
            />
          )}
        </div>
      )}

      <div className="mt-4">
        <Button
          type="button"
          onClick={handleClear}
          variant="outline"
          className="mr-2"
        >
          Clear
        </Button>
        <Button type="button" onClick={handleSave} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Save Signature"}
        </Button>
      </div>
    </div>
  );
};

export default SignatureField;