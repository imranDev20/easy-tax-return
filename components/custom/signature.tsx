import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface SignatureFieldProps {
  onChange: (signatureData: string | null) => void;
  value: string | null;
  width: number;
  height: number;
}

const SignatureField: React.FC<SignatureFieldProps> = ({
  onChange,
  value,
  width,
  height,
}) => {
  const [mode, setMode] = useState<"draw" | "type" | "upload">("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (value) {
      if (value.startsWith("data:image")) {
        setMode("draw");
        if (signatureCanvasRef.current) {
          signatureCanvasRef.current.fromDataURL(value);
        }
      } else if (value.startsWith("http")) {
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
            // onChange={handleUpload}
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
        {/* <Button type="button" onClick={handleSave} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Save Signature"}
        </Button> */}
      </div>
    </div>
  );
};

export default SignatureField;
