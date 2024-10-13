import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { numericFormatter } from "react-number-format"; // Adjust the import path as needed
import { FormField } from "@/types/tax-return-form";
import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";

type Image = {
  src: string;
};

export const generatePDF = async (
  images: Image[],
  formFields: FormField[],
  formData: IndividualTaxReturnFormInput
): Promise<void> => {
  const pdf = new jsPDF("p", "px", [595, 842]); // A4 size in pixels at 72 dpi

  const baseStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    body {
      line-height: 1;
      font-family: Arial, sans-serif;
    }
  `;

  for (let i = 0; i < images.length; i++) {
    const formContainer = document.createElement("div");
    formContainer.style.position = "relative";
    formContainer.style.width = "595px";
    formContainer.style.height = "842px";

    const imageContainer = document.createElement("div");
    imageContainer.style.position = "relative";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";

    const img = document.createElement("img");
    img.src = images[i].src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const fieldsContainer = document.createElement("div");
    fieldsContainer.style.position = "absolute";
    fieldsContainer.style.top = "0";
    fieldsContainer.style.left = "0";
    fieldsContainer.style.width = "100%";
    fieldsContainer.style.height = "100%";

    formFields
      .filter(
        (field) =>
          field.imageIndex === i && field.isVisible && field.type === "text"
      )
      .forEach((field) => {
        const fieldContainer = document.createElement("div");
        fieldContainer.style.position = "absolute";
        fieldContainer.style.left = `${field.x / 10}%`;
        fieldContainer.style.top = `${field.y / 10}%`;
        fieldContainer.style.width = `${field.width / 10}%`;
        fieldContainer.style.height = `${field.height / 10}%`;
        fieldContainer.style.display = "flex";
        fieldContainer.style.alignItems = "center";
        fieldContainer.style.justifyContent = "flex-start";
        fieldContainer.style.overflow = "hidden";

        const valueElement = document.createElement("span");
        valueElement.style.fontSize = "13px";
        valueElement.style.lineHeight = "1";
        valueElement.style.paddingLeft = "5px";
        valueElement.style.paddingRight = "5px";
        valueElement.style.whiteSpace = "nowrap";
        valueElement.style.overflow = "hidden";
        valueElement.style.textOverflow = "ellipsis";

        const value =
          formData[field.name as keyof IndividualTaxReturnFormInput];

        if (field.type === "number" && value) {
          valueElement.textContent = numericFormatter(value.toString(), {
            thousandSeparator: true,
            decimalScale: 2,
            fixedDecimalScale: true,
          });
        } else {
          valueElement.textContent = value?.toString() || "";
        }

        fieldContainer.appendChild(valueElement);
        fieldsContainer.appendChild(fieldContainer);
      });

    imageContainer.appendChild(fieldsContainer);
    formContainer.appendChild(imageContainer);

    const styleElement = document.createElement("style");
    styleElement.textContent = baseStyles;
    formContainer.appendChild(styleElement);

    document.body.appendChild(formContainer);

    const canvas = await html2canvas(formContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL("image/png");

    if (i > 0) {
      pdf.addPage();
    }
    pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
    document.body.removeChild(formContainer);
  }

  pdf.save("filled_form.pdf");
};
