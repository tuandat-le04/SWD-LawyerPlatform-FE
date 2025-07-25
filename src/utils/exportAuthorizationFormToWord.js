import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportAuthorizationFormToWord() {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("Độc lập - Tự do - Hạnh phúc")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "GIẤY ỦY QUYỀN", bold: true, size: 32 }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("Số: ............")],
          }),
          new Paragraph(
            "Hôm nay, ngày ..... tháng ..... năm ......., tại ...................."
          ),
          new Paragraph({ text: "BÊN ỦY QUYỀN (BÊN A):", bold: true }),
          new Paragraph(
            "- Ông/Bà: .............................................   Sinh năm: ............."
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do ..................... cấp ngày ..../..../......"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: ............................................................."
          ),
          new Paragraph({ text: "BÊN ĐƯỢC ỦY QUYỀN (BÊN B):", bold: true }),
          new Paragraph(
            "- Ông/Bà: .............................................   Sinh năm: ............."
          ),
          new Paragraph(
            "  CMND/CCCD/Hộ chiếu số: .............. do ..................... cấp ngày ..../..../......"
          ),
          new Paragraph(
            "  Hộ khẩu thường trú: ............................................................."
          ),
          new Paragraph({ text: "NỘI DUNG ỦY QUYỀN", bold: true }),
          new Paragraph(
            "Bên A ủy quyền cho Bên B thực hiện các công việc sau đây: ...................................................."
          ),
          new Paragraph(
            "Thời hạn ủy quyền: ...................................................."
          ),
          new Paragraph(
            "Quyền và nghĩa vụ của các bên: ...................................................."
          ),
          new Paragraph(
            "Hai bên cam kết thực hiện đúng các nội dung đã thỏa thuận trong giấy ủy quyền này và chịu trách nhiệm trước pháp luật về việc ủy quyền."
          ),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "BÊN ỦY QUYỀN (BÊN A)", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký, ghi rõ họ tên)")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "BÊN ĐƯỢC ỦY QUYỀN (BÊN B)", bold: true }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký, ghi rõ họ tên)")],
          }),
          new Paragraph({ text: "Hướng dẫn sử dụng mẫu:", bold: true }),
          new Paragraph(
            "- Điền đầy đủ thông tin cá nhân của bên ủy quyền và bên được ủy quyền."
          ),
          new Paragraph("- Ghi rõ nội dung, phạm vi, thời hạn ủy quyền."),
          new Paragraph(
            "- Hai bên ký tên xác nhận và nộp tại cơ quan có thẩm quyền nếu cần."
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Giay_Uy_Quyen.docx");
  });
}
