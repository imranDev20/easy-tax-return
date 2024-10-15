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
          field.imageIndex === i &&
          field.isVisible &&
          field.isShowInPDF !== false &&
          field.type !== "select"
      )
      .forEach((field) => {
        if (field.type === "radio") {
          const value =
            formData[field.name as keyof IndividualTaxReturnFormInput];
          field.options?.forEach((option) => {
            const radioContainer = document.createElement("div");
            radioContainer.style.position = "absolute";
            radioContainer.style.left = `${option.x / 10}%`;
            radioContainer.style.top = `${option.y / 10}%`;
            radioContainer.style.width = `${option.width / 10}%`;
            radioContainer.style.height = `${option.height / 10}%`;
            radioContainer.style.display = "flex";
            radioContainer.style.alignItems = "center";
            radioContainer.style.justifyContent = "center";

            if (value === option.value) {
              const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
              );
              svg.setAttribute("viewBox", "0 0 150 150");
              svg.style.width = "80%";
              svg.style.height = "80%";

              const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
              );
              path.setAttribute(
                "d",
                "M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z"
              );
              path.setAttribute("fill", "black");

              svg.appendChild(path);
              radioContainer.appendChild(svg);
            }

            fieldsContainer.appendChild(radioContainer);
          });
        } else {
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
          valueElement.style.fontSize = "12px";
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
        }
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
