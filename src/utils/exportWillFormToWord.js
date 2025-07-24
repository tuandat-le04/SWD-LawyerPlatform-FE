import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportWillFormToWord() {
  const doc = new Document({
    sections: [
      {
        children: [
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
            alignment: "center",
            children: [new TextRun("DI CHÚC")],
          }),
          new Paragraph(
            "Hôm nay, ngày ... tháng ..... năm ...., tại ..............................................................,"
          ),
          new Paragraph("Tôi là: ........................................"),
          new Paragraph("Sinh ngày .... tháng .... năm ............"),
          new Paragraph(
            "CMND/CCCD/Hộ chiếu số: ........................ do ........................... cấp ngày ...................."
          ),
          new Paragraph(
            "Hộ khẩu thường trú tại: ...................................................................................................."
          ),
          new Paragraph(
            "Nay, trong trạng thái tinh thần hoàn toàn minh mẫn, sáng suốt, không bị bất kỳ một sự lừa dối, đe dọa hoặc cưỡng ép nào, tôi lập di chúc này để định đoạt như sau:"
          ),
          new Paragraph({ text: "Tài sản của tôi gồm: (1)", bold: true }),
          new Paragraph(
            "1/ Quyền sử dụng đất và tài sản gắn liền với đất thuộc quyền sở hữu, sử dụng của tôi theo Giấy chứng nhận quyền sử dụng đất ................................... Số phát hành  ..................... số vào sổ cấp giấy chứng nhận quyền sử dụng đất: ........................ do ............................... cấp ngày ......................"
          ),
          new Paragraph("Thông tin cụ thể như sau:"),
          new Paragraph("* Quyền sử dung đất:"),
          new Paragraph(
            "- Diện tích đất: ....... m2 (Bằng chữ: ........................ mét vuông)"
          ),
          new Paragraph(
            "- Địa chỉ thửa đất: ...................................................."
          ),
          new Paragraph(
            "- Thửa đất:     ...........          - Tờ bản đồ:   ............."
          ),
          new Paragraph("- Mục đích sử dụng:  ....................."),
          new Paragraph("- Thời hạn sử dụng: ............................."),
          new Paragraph(
            "- Nguồn gốc sử dụng: ......................................................"
          ),
          new Paragraph("* Tài sản gắn liền với đất:"),
          new Paragraph(
            "- Loại nhà: ……………...……;            - Diện tích sàn: ……… m2"
          ),
          new Paragraph(
            "- Kết cấu nhà : .....................;          - Số tầng : ............."
          ),
          new Paragraph(
            "- Thời hạn xây dựng: ............;          - Năm hoàn thành xây dựng : ............"
          ),
          new Paragraph(
            "2/ Quyền sở hữu, sử dụng chiếc xe ô tô mang biển số …………. theo giấy đăng ký ô tô số ……… do công an ………. cấp ngày …………… Đăng ký lần đầu ngày …………… mang tên ông/bà: …………………. Địa chỉ:  …………………………………………."
          ),
          new Paragraph(
            "Nhãn hiệu   : ................................................"
          ),
          new Paragraph(
            "Số loại         : ................................................."
          ),
          new Paragraph(
            "Loại xe        : ................................................"
          ),
          new Paragraph(
            "Màu Sơn     : ................................................"
          ),
          new Paragraph(
            "Số máy        : ................................................"
          ),
          new Paragraph(
            "Số khung     : ................................................"
          ),
          new Paragraph(
            "Số chỗ ngồi : ................................................"
          ),
          new Paragraph(
            "Năm sản xuất: ................................................"
          ),
          new Paragraph(
            "3/ Sổ Tiết kiệm có kỳ hạn số ……………. số tài khoản ………………… kỳ hạn …….. do Ngân hàng …………………., phát hành ngày …………….., ngày đến hạn ……………. mang tên …………… với số tiền là ……… VNĐ (Bằng chữ: …………..)."
          ),
          new Paragraph({
            text: "Sau khi tôi chết, di sản nêu trên của tôi được để lại cho: (2)",
            bold: true,
          }),
          new Paragraph("1/ Ông/bà: ........................................"),
          new Paragraph("Sinh ngày .... tháng .... năm ............"),
          new Paragraph(
            "CMND/CCCD/Hộ chiếu số: ........................ do ........................... cấp ngày ...................."
          ),
          new Paragraph(
            "Hộ khẩu thường trú tại: ...................................................................................................."
          ),
          new Paragraph("2/ Ông/bà: ........................................"),
          new Paragraph("Sinh ngày .... tháng .... năm ............"),
          new Paragraph(
            "CMND/CCCD/Hộ chiếu số: ........................ do ........................... cấp ngày ...................."
          ),
          new Paragraph(
            "Hộ khẩu thường trú tại: ...................................................................................................."
          ),
          new Paragraph(
            "Ngoài ông/bà .................., tôi không để lại tài sản nêu trên của mình cho bất cứ ai khác."
          ),
          new Paragraph(
            "Ý nguyện của tôi: ........................................................................"
          ),
          new Paragraph(
            "............................................................................................................................................"
          ),
          new Paragraph(
            "Sau khi tôi qua đời, (3) ...........................  được toàn quyền làm các thủ tục theo quy định của pháp luật để được đứng tên số tài sản nói trên theo bản di chúc này."
          ),
          new Paragraph(
            "Di chúc này được tự tay tôi viết, thể hiện đầy đủ, dứt khoát ý chí của tôi, được lập thành (4) .... (...) bản, mỗi bản gồm ... (...) trang.... (...) tờ."
          ),
          new Paragraph({
            text: "NGƯỜI LẬP DI CHÚC",
            bold: true,
            alignment: "center",
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(Ký ghi rõ họ tên và điểm chỉ)")],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Don_Di_Chuc.docx");
  });
}
