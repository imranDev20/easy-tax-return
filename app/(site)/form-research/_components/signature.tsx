import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SignatureFieldProps {
  onChange: (signatureData: string | null) => void;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ onChange }) => {
  const [mode, setMode] = useState<"draw" | "type" | "upload">("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(
    null
  );
  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
    setTypedSignature("");
    setUploadedSignature(null);
    onChange(null);
  };

  const handleSave = () => {
    let signatureData: string | null = null;
    switch (mode) {
      case "draw":
        signatureData = signatureCanvasRef.current?.toDataURL() || null;
        break;
      case "type":
        signatureData = typedSignature;
        break;
      case "upload":
        signatureData = uploadedSignature;
        break;
    }
    onChange(signatureData);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedSignature(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border p-4 rounded-md">
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
            width: 500,
            height: 200,
            className: "border rounded-md",
          }}
        />
      )}

      {mode === "type" && (
        <input
          type="text"
          value={typedSignature}
          onChange={(e) => setTypedSignature(e.target.value)}
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
          />
          {uploadedSignature && (
            <Image
              src={uploadedSignature}
              alt="Uploaded Signature"
              className="max-w-full h-auto"
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
        <Button type="button" onClick={handleSave}>
          Save Signature
        </Button>
      </div>
    </div>
  );
};

export default SignatureField;
