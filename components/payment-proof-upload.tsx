"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface PaymentProofUploadProps {
  onUpload: (file: File) => void
}

const PaymentProofUpload: React.FC<PaymentProofUploadProps> = ({ onUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      setUploadedFile(file)
      onUpload(file) // Pass the file to the parent component
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the payment proof here ...</p>
      ) : (
        <p>Drag 'n' drop payment proof here, or click to select files</p>
      )}
      {uploadedFile && (
        <div>
          <p>Uploaded file: {uploadedFile.name}</p>
          {/* Display a preview of the image if it's an image file */}
          {uploadedFile.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(uploadedFile) || "/placeholder.svg"}
              alt="Payment Proof Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentProofUpload
