import { jsPDF } from "jspdf";
import React, { useRef } from "react";
import TemplatePDF from "./TemplatePDF";


const GeneratePDF: React.FC = () => {
  const certificateTemplateRef = useRef<any>(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
   
   

    // Adding the fonts
    

    doc.html(certificateTemplateRef.current, {
      async callback(doc) {
        // save the document as a PDF with name of Memes
        doc.save("Memes");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <button
        style={{
          margin: "50px",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          fontFamily: "Anton",
          fontSize: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
          cursor: "pointer",
          width: "200px"
        }}
        onClick={handleGeneratePdf}
      >
        Generate Pdf
      </button>
      <div ref={certificateTemplateRef}>
        <header>cek gan</header>
        <TemplatePDF />
      </div>
    </div>
  );
};

export default GeneratePDF;
