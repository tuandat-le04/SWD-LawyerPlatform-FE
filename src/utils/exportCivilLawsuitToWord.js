import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportCivilLawsuitToWord() {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: "right",
            children: [
              new TextRun({ text: "Mẫu đơn khởi kiện", italics: true }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({
                text: "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("Độc lập - Tự do - Hạnh phúc")],
          }),
          new Paragraph({
            alignment: "right",
            children: [
              new TextRun(".....(1), ngày .... tháng ..... năm ....."),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "ĐƠN KHỞI KIỆN", bold: true, size: 32 }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("về việc ..... ")],
          }),
          new Paragraph(
            "Kính gửi: Tòa án nhân dân (2)......................................................."
          ),
          new Paragraph(
            "Họ và tên người khởi kiện: (3)......................................................."
          ),
          new Paragraph(
            "Địa chỉ: (4)............................................................................."
          ),
          new Paragraph(
            "Họ và tên người có quyền lợi và lợi ích được bảo vệ (nếu có): (5)......................."
          ),
          new Paragraph(
            "Địa chỉ: (6)............................................................................."
          ),
          new Paragraph(
            "Họ và tên người bị kiện: (7)............................................................"
          ),
          new Paragraph(
            "Địa chỉ: (8)............................................................................."
          ),
          new Paragraph(
            "Họ và tên người có quyền lợi, nghĩa vụ liên quan (nếu có): (9).........................."
          ),
          new Paragraph(
            "Địa chỉ: (10)............................................................................"
          ),
          new Paragraph({ text: "NỘI DUNG KHỞI KIỆN", bold: true }),
          new Paragraph(
            "Yêu cầu Tòa án giải quyết những vấn đề sau đây đối với bị đơn, người có quyền lợi, nghĩa vụ liên quan:(11)"
          ),
          new Paragraph(
            "......................................................................................."
          ),
          new Paragraph(
            "Yêu cầu Tòa án giải quyết những vấn đề sau đây đối với người có quyền lợi, nghĩa vụ liên quan:(12)"
          ),
          new Paragraph(
            "......................................................................................."
          ),
          new Paragraph(
            "Họ và tên người làm chứng (nếu có): (13).................................................."
          ),
          new Paragraph(
            "Địa chỉ: (14)............................................................................"
          ),
          new Paragraph(
            "Những tài liệu, chứng cứ kèm theo đơn kiện gồm có:(15)"
          ),
          new Paragraph(
            "1....................................................................................."
          ),
          new Paragraph(
            "2....................................................................................."
          ),
          new Paragraph(
            "(Các thông tin khác mà người khởi kiện xét thấy cần thiết cho việc giải quyết vụ án) (16)"
          ),
          new Paragraph(
            "......................................................................................."
          ),
          new Paragraph("Người khởi kiện"),
          new Paragraph({ text: "Hướng dẫn sử dụng mẫu:", bold: true }),
          new Paragraph(
            "(1) Ghi địa điểm làm đơn khởi kiện (ví dụ: Thành phố Hà Nội, ngày.... tháng .... năm....)."
          ),
          new Paragraph(
            "(2) Ghi tên Tòa án nhân dân cấp giải quyết vụ án; nếu là tòa án nhân dân cấp huyện, thì ghi tên đầy đủ của tòa án nhân dân huyện tại quốc tỉnh, thành phố trực thuộc trung ương (ví dụ: Tòa án nhân dân huyện A thuộc tỉnh B, nếu là tòa án nhân dân tỉnh thì ghi rõ Tòa án nhân dân tỉnh (thành phố) nào về vụ: Tòa án nhân dân tỉnh Hưng Yên và địa chỉ của tòa án đó)."
          ),
          new Paragraph(
            "(3) Nếu người khởi kiện là cá nhân, thì ghi họ và tên, nếu người khởi kiện là cơ quan, tổ chức, thì ghi tên cơ quan, tổ chức, địa chỉ của cơ quan, tổ chức và tên người đại diện theo pháp luật của cơ quan, tổ chức đó."
          ),
          new Paragraph(
            "(4) Nếu người khởi kiện là cá nhân, thì ghi địa chỉ của cá nhân đó; nếu là cơ quan, tổ chức thì ghi địa chỉ của cơ quan, tổ chức đó (ví dụ: Nguyễn Văn A, số nhà 1, đường B, xã C, huyện M, tỉnh H); nếu là doanh nghiệp thì ghi địa chỉ trụ sở của doanh nghiệp đó và tên người đại diện theo pháp luật của doanh nghiệp đó (ví dụ: Công ty TNHH Hưng Sen có trụ sở tại số 1, đường D, xã E, huyện F, tỉnh G, người đại diện theo pháp luật là ông Nguyễn Văn B, chức vụ giám đốc)."
          ),
          new Paragraph(
            "(5), (6), (7), (8), (9) và (10) Ghi như hướng dẫn đối với người khởi kiện."
          ),
          new Paragraph(
            "(11), (12) và (13) Ghi rõ yêu cầu của người khởi kiện đối với bị đơn, người có quyền lợi, nghĩa vụ liên quan."
          ),
          new Paragraph(
            "(14) Ghi địa chỉ của người làm chứng (ví dụ: Nguyễn Văn A, số nhà 1, đường B, xã C, huyện M, tỉnh H)."
          ),
          new Paragraph(
            "(15) Những tài liệu, chứng cứ kèm theo đơn khởi kiện gồm có: bản sao hợp đồng mua bán nhà đất, bản sao giấy chứng nhận quyền sử dụng đất, bản sao giấy đăng ký kết hôn, bản sao giấy khai sinh, bản sao giấy tờ tùy thân, các tài liệu khác có liên quan đến vụ án."
          ),
          new Paragraph(
            "(16) Nếu người khởi kiện là cá nhân, thì phải có chữ ký của người khởi kiện; nếu là cơ quan, tổ chức thì ghi rõ tên cơ quan, tổ chức, chức vụ của người đại diện theo pháp luật của cơ quan, tổ chức, chức vụ ký kiện, ghi rõ họ tên, chức vụ của mình và đóng dấu của cơ quan, tổ chức đó."
          ),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Don_khoi_kien_dan_su.docx");
  });
}
