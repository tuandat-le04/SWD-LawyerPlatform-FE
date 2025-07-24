import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportAdministrativeComplaintFormToWord() {
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
          new Paragraph({ alignment: "center", children: [new TextRun("")] }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "ĐƠN KHIẾU NẠI", bold: true, size: 32 }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Về việc ……… )")],
          }),
          new Paragraph(
            "Kính gửi: … (Tên cơ quan, tổ chức có thẩm quyền giải quyết)"
          ),
          new Paragraph("Tên tôi là: ………  sinh ngày … tháng … năm …"),
          new Paragraph("Thường trú tại: …………………...……………"),
          new Paragraph("Số CMND: ………………………………………"),
          new Paragraph("Ngày và nơi cấp: ………………………………"),
          new Paragraph("Hiện đang (làm gì, ở đâu): …………………"),
          new Paragraph(
            "Khiếu nại về hành vi hành chính của: .... (Ghi tên người bị khiếu nại)"
          ),
          new Paragraph({
            text: "Giải trình vụ việc cần khiếu nại:",
            bold: true,
          }),
          new Paragraph(
            "- Nêu tóm tắt sự việc xảy ra, ngắn gọn, đủ tình tiết."
          ),
          new Paragraph({ text: "Yêu cầu giải quyết khiếu nại:", bold: true }),
          new Paragraph(
            "- Đề nghị thẩm tra, xác minh (có thể giới thiệu tài liệu, chứng cứ, người biết việc làm chứng…)"
          ),
          new Paragraph(
            "- Giải quyết lại theo đúng chính sách pháp luật, đúng quyền lợi hợp pháp."
          ),
          new Paragraph(
            "Tôi xin cam đoan về nội dung khiếu nại trên là đúng sự thật và xin chịu trách nhiệm về nội dung đã khiếu nại."
          ),
          new Paragraph(
            "Mong quý cơ quan sớm xét và giải quyết để bảo vệ quyền lợi cho …"
          ),
          new Paragraph("………………………………………"),
          new Paragraph("Xin chân thành cảm ơn quý cơ quan."),
          new Paragraph("…, ngày ... tháng … năm ..."),
          new Paragraph({
            text: "Người làm đơn",
            bold: true,
            alignment: "center",
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký tên và ghi rõ họ tên)")],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Don_Khieu_Nai_Hanh_Chinh.docx");
  });
}
