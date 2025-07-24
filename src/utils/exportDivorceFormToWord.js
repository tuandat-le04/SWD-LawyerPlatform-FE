import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportDivorceFormToWord() {
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
            children: [new TextRun("…….., ngày ….. tháng …. năm ………")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "ĐƠN YÊU CẦU GIẢI QUYẾT VIỆC DÂN SỰ",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun(
                "(V/v: Công nhận thuận tình ly hôn và thỏa thuận về con cái, tài sản)"
              ),
            ],
          }),
          new Paragraph("Kính gửi: Tòa án nhân dân …………………………………………………….."),
          new Paragraph({ text: "Họ tên người yêu cầu:", bold: true }),
          new Paragraph("1. Tên chồng: …...…………………………….. Sinh năm: ……………………."),
          new Paragraph(
            "Địa chỉ:............................................................................................................"
          ),
          new Paragraph(
            "Số điện thoại: …………………(nếu có); số fax: ……………….……….(nếu có)"
          ),
          new Paragraph(
            "Địa chỉ thư điện tử: ………....................................................................... (nếu có)"
          ),
          new Paragraph("2. Tên vợ: …...…………………………….. Sinh năm: ………...………………."),
          new Paragraph(
            "Địa chỉ:............................................................................................................."
          ),
          new Paragraph(
            "Số điện thoại: …………………(nếu có); số fax: ……………….……….(nếu có)"
          ),
          new Paragraph(
            "Địa chỉ thư điện tử: ………....................................................................... (nếu có)"
          ),
          new Paragraph(
            "Chúng tôi xin trình bày với Tòa án nhân dân……………….. việc như sau: "
          ),
          new Paragraph({
            text: "1. Những vấn đề yêu cầu Tòa án giải quyết:",
            bold: true,
          }),
          new Paragraph("- Về quan hệ hôn nhân: …………………………………………………………."),
          new Paragraph(
            "- Về con chung:......................................................................................................."
          ),
          new Paragraph(
            "- Về tài sản chung: …….........................................................................................."
          ),
          new Paragraph(
            "- Về công nợ:.........................................................................................................."
          ),
          new Paragraph({
            text: "2. Lý do, mục đích yêu cầu Tòa án giải quyết những vấn đề nêu trên:",
            bold: true,
          }),
          new Paragraph("…………………………………………………………………………………"),
          new Paragraph({
            text: "3. Căn cứ của việc yêu cầu Tòa án giải quyết những vấn đề nêu trên:",
            bold: true,
          }),
          new Paragraph("…………………………………………………………………………………"),
          new Paragraph({
            text: "4. Tên và địa chỉ của những người có liên quan đến những vấn đề yêu cầu Tòa án giải quyết:",
            bold: true,
          }),
          new Paragraph("………….…………………………………………………………………….."),
          new Paragraph({ text: "5. Thông tin khác:", bold: true }),
          new Paragraph("…………………………………………………………………………………"),
          new Paragraph({
            text: "Danh mục tài liệu, chứng cứ kèm theo đơn gồm có:",
            bold: true,
          }),
          new Paragraph("1. Chứng minh nhân dân (bản chứng thực)"),
          new Paragraph("2. Sổ hộ khẩu (Bản chứng thực)"),
          new Paragraph("3. Giấy khai sinh (Bản chứng thực)"),
          new Paragraph("4. Đăng ký kết hôn"),
          new Paragraph("5. Một số giấy tờ khác có liên quan"),
          new Paragraph(
            "Tôi cam kết những lời khai trong đơn là hoàn toàn đúng sự thực."
          ),
          new Paragraph({
            text: "NGƯỜI YÊU CẦU",
            bold: true,
            alignment: "center",
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "Vợ", bold: true }),
              new TextRun({
                text: "                                                        ",
              }),
              new TextRun({ text: "Chồng", bold: true }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Don_Ly_Hon.docx");
  });
}
