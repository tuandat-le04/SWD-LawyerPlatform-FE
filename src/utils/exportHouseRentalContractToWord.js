import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportHouseRentalContractToWord() {
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
            alignment: "right",
            children: [new TextRun("………., ngày .... tháng .... năm ....")],
          }),
          new Paragraph({
            alignment: "center",
            children: [
              new TextRun({ text: "HỢP ĐỒNG THUÊ NHÀ", bold: true, size: 32 }),
            ],
          }),
          new Paragraph(
            "- Căn cứ Bộ luật Dân sự số 91/2015/QH13 ngày 24/11/2015;"
          ),
          new Paragraph(
            "- Căn cứ vào Luật Thương mại số 36/2005/QH11 ngày 14 tháng 06 năm 2005;"
          ),
          new Paragraph(
            "- Căn cứ vào nhu cầu và sự thỏa thuận của các bên tham gia Hợp đồng;"
          ),
          new Paragraph(
            "Hôm nay, ngày.....tháng......năm........., các Bên gồm:"
          ),
          new Paragraph({ text: "BÊN CHO THUÊ (Bên A):", bold: true }),
          new Paragraph("Ông: …………………….."),
          new Paragraph(
            "CMND số:................ Cơ quan cấp:…………………...……….. Ngày cấp:.............."
          ),
          new Paragraph(
            "Nơi ĐKTT:........................................................................................"
          ),
          new Paragraph({ text: "BÊN THUÊ (Bên B):", bold: true }),
          new Paragraph("Ông: …………………….."),
          new Paragraph(
            "CMND số:................ Cơ quan cấp:…………………...……….. Ngày cấp:.............."
          ),
          new Paragraph(
            "Nơi ĐKTT:........................................................................................"
          ),
          new Paragraph(
            "Bên A và Bên B sau đây gọi chung là “Hai Bên” hoặc “Các Bên”."
          ),
          new Paragraph(
            "Sau khi thảo luận, Hai Bên thống nhất đi đến ký kết Hợp đồng thuê nhà (“Hợp Đồng”) với các điều khoản và điều kiện dưới đây:"
          ),
          new Paragraph({
            text: "Điều 1. Nhà ở và các tài sản cho thuê kèm theo nhà ở:",
            bold: true,
          }),
          new Paragraph(
            "1.1. Bên A đồng ý cho Bên B thuê và Bên B cũng đồng ý thuê quyền sử dụng đất và một căn nhà ......... tầng gắn liền với quyền sử dụng đất tại địa chỉ ... để sử dụng làm nơi để ở."
          ),
          new Paragraph("Diện tích quyền sử dụng đất:...................m2;"),
          new Paragraph("Diện tích căn nhà :....................m2;"),
          new Paragraph(
            "1.2. Bên A cam kết quyền sử sụng đất và căn nhà gắn liền trên đất trên là tài sản sở hữu hợp pháp của Bên A. Mọi tranh chấp phát sinh từ tài sản cho thuê trên Bên A hoàn toàn chịu trách nhiệm trước pháp luật."
          ),
          new Paragraph({
            text: "Điều 2. Bàn giao và sử dụng diện tích thuê:",
            bold: true,
          }),
          new Paragraph(
            "2.1. Thời điểm Bên A bàn giao tài sản thuê vào ngày.....tháng.....năm…..;"
          ),
          new Paragraph(
            "2.2. Bên B được toàn quyền sử dụng tài sản thuê kể từ thời điểm được Bên A bàn giao từ thời điểm quy định tại Mục 2.1 trên đây."
          ),
          new Paragraph({ text: "Điều 3. Thời hạn thuê", bold: true }),
          new Paragraph(
            "3.1. Bên A cam kết cho Bên B thuê tài sản thuê với thời hạn là ......... năm kể từ ngày bàn giao Tài sản thuê;"
          ),
          new Paragraph(
            "3.2. Hết thời hạn thuê nêu trên nếu bên B có nhu cầu tiếp tục sử dụng thì Bên A phải ưu tiên cho Bên B tiếp tục thuê."
          ),
          new Paragraph({ text: "Điều 4. Đặt cọc tiền thuê nhà", bold: true }),
          new Paragraph(
            "4.1. Bên B sẽ giao cho Bên A một khoản tiền là ........................ VNĐ (bằng chữ:...............................................) ngay sau khi ký hợp đồng này. Số tiền này là tiền đặt cọc để đảm bảm thực hiện Hợp đồng cho thuê nhà."
          ),
          new Paragraph(
            "4.2. Nếu Bên B đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo trước tới Bên A thì Bên A sẽ không phải hoàn trả lại Bên B số tiền đặt cọc này."
          ),
          new Paragraph(
            "Nếu Bên A đơn phương chấm dứt hợp đồng mà không thực hiện nghĩa vụ báo trước tới bên B thì bên A sẽ phải hoàn trả lại Bên B số tiền đặt cọc và phải bồi thường thêm một khoản bằng chính tiền đặt cọc."
          ),
          new Paragraph(
            "4.3. Tiền đặt cọc của Bên B sẽ không được dùng để thanh toán tiền thuê. Nếu Bên B vi phạm Hợp Đồng làm phát sinh thiệt hại cho Bên A thì Bên A có quyền khấu trừ tiền đặt cọc để bù đắp các chi phí khắc phục thiệt hại phát sinh. Mức chi phí bù đắp thiệt hại sẽ được Các Bên thống nhất bằng văn bản."
          ),
          new Paragraph(
            "4.4. Vào thời điểm kết thúc thời hạn thuê hoặc kể từ ngày chấm dứt Hợp đồng, Bên A sẽ hoàn lại cho Bên B số tiền đặt cọc sau khi đã khấu trừ khoản tiền chi phí để khắc phục thiệt hại (nếu có)."
          ),
          new Paragraph({ text: "Điều 5. Tiền thuê nhà:", bold: true }),
          new Paragraph(
            "5.1 Tiền thuê nhà đối với diện tích thuê nêu tại mục 1.1 Điều 1 là: .......................... VNĐ/tháng (Bằng chữ:...........................................)"
          ),
          new Paragraph(
            "5.2 Tiền thuê nhà không bao gồm chi phí khác như tiền điện, nước, vệ sinh.... Khoản tiền này sẽ do bên B trả theo khối lượng, công suất sử dụng thực tế của Bên B hàng tháng, được tính theo đơn giá của nhà nước."
          ),
          new Paragraph({
            text: "Điều 6. Phương thức thanh toán tiền thuê nhà",
            bold: true,
          }),
          new Paragraph(
            "Tiền thuê nhà được thanh toán theo 01 (một) tháng/lần vào ngày 05 (năm) hàng tháng."
          ),
          new Paragraph(
            "Các chi phí khác được bên B tự thanh toán với các cơ quan, đơn vị có liên quan khi được yêu cầu."
          ),
          new Paragraph(
            "Việc thanh toán tiền thuê nhà được thực hiện bằng đồng tiền Việt Nam theo hình thức trả trực tiếp bằng tiền mặt."
          ),
          new Paragraph({
            text: "Điều 7. Quyền và nghĩa vụ của bên cho thuê nhà",
            bold: true,
          }),
          new Paragraph("7.1. Quyền lợi"),
          new Paragraph(
            "- Yêu cầu Bên B thanh toán tiền thuê và chi phí khác đầy đủ, đúng hạn theo thoả thuận trong Hợp Đồng;"
          ),
          new Paragraph(
            "- Yêu cầu Bên B phải sửa chữa phần hư hỏng, thiệt hại do lỗi của Bên B gây ra."
          ),
          new Paragraph("7.2. Nghĩa vụ của"),
          new Paragraph(
            "- Bàn giao diện tích thuê cho Bên B theo đúng thời gian quy định trong Hợp đồng;"
          ),
          new Paragraph(
            "- Đảm bảo việc cho thuê theo Hợp đồng này là đúng quy định của pháp luật;"
          ),
          new Paragraph(
            "- Đảm bảo cho Bên B thực hiện quyền sử dụng diện tích thuê một cách độc lập và liên tục trong suốt thời hạn thuê, trừ trường hợp vi phạm pháp luật và/hoặc các quy định của Hợp đồng này."
          ),
          new Paragraph(
            "- Không xâm phạm trái phép đến tài sản của Bên B trong phần diện tích thuê. Nếu Bên A có những hành vi vi phạm gây thiệt hại cho Bên B trong thời gian thuê thì Bên A phải bồi thường."
          ),
          new Paragraph(
            "- Tuân thủ các nghĩa vụ khác theo thoả thuận tại Hợp đồng này hoặc/và các văn bản kèm theo Hợp đồng này; hoặc/và theo quy định của pháp luật Việt Nam."
          ),
          new Paragraph({
            text: "Điều 8. Quyền và nghĩa vụ của bên thuê nhà",
            bold: true,
          }),
          new Paragraph("8.1. Quyền lợi"),
          new Paragraph(
            "- Nhận bàn giao diện tích thuê theo đúng thoả thuận trong Hợp đồng;"
          ),
          new Paragraph(
            "- Được sử dụng phần diện tích thuê làm nơi ở và các hoạt động hợp pháp khác;"
          ),
          new Paragraph(
            "- Yêu cầu Bên A sửa chữa kịp thời những hư hỏng không phải do lỗi của Bên B trong phần diện tích thuê để bảo đảm an toàn;"
          ),
          new Paragraph(
            "- Được tháo dỡ và đem ra khỏi phần diện tích thuê các tài sản, trang thiết bị của Bên B đã lắp đặt trong phần diện tích thuê khi hết thời hạn thuê hoặc đơn phương chấm dứt hợp đồng."
          ),
          new Paragraph("8.2. Nghĩa vụ"),
          new Paragraph(
            "- Sử dụng diện tích thuê đúng mục đích đã thỏa thuận, giữ gìn nhà ở và có trách nhiệm trong việc sửa chữa những hư hỏng do mình gây ra;"
          ),
          new Paragraph(
            "- Thanh toán tiền đặt cọc, tiền thuê đầy đủ, đúng thời hạn đã thỏa thuận;"
          ),
          new Paragraph(
            "- Trả lại diện tích thuê cho Bên A khi hết thời hạn thuê hoặc chấm dứt Hợp đồng thuê;"
          ),
          new Paragraph(
            "- Mọi việc sửa chữa, cải tạo, lắp đặt bổ sung các trang thiết bị làm ảnh hưởng đến kết cấu của căn phòng…, Bên B phải có văn bản thông báo cho Bên A và chỉ được tiến hành các công việc này sau khi có sự đồng ý bằng văn bản của Bên A;"
          ),
          new Paragraph(
            "- Tuân thủ một cách chặt chẽ quy định tại Hợp đồng này và các quy định của pháp luật Việt Nam."
          ),
          new Paragraph({
            text: "Điều 9. Đơn phương chấm dứt hợp đồng thuê nhà:",
            bold: true,
          }),
          new Paragraph(
            "Trong trường hợp một trong Hai Bên muốn đơn phương chấm dứt Hợp đồng trước hạn thì phải thông báo bằng văn bản cho bên kia trước 30 (ba mươi) ngày so với ngày mong muốn chấm dứt. Nếu một trong Hai Bên không thực hiện nghĩa vụ thông báo cho Bên kia thì sẽ phải bồi thường cho bên đó một khoản tiền thuê tương đương với thời gian không thông báo và các thiệt hại khác phát sinh do việc chấm dứt Hợp đồng trái quy định."
          ),
          new Paragraph({ text: "Điều 10. Điều khoản thi hành", bold: true }),
          new Paragraph(
            "- Hợp đồng này có hiệu lực kể từ ngày hai bên cùng ký kết;"
          ),
          new Paragraph(
            "- Các Bên cam kết thực hiện nghiêm chỉnh và đầy đủ các thoả thuận trong Hợp đồng này trên tinh thần hợp tác, thiện chí;"
          ),
          new Paragraph(
            "- Mọi sửa đổi, bổ sung đối với bất kỳ điều khoản nào của Hợp đồng phải được lập thành văn bản, có đầy đủ chữ ký của mỗi Bên. Văn bản sửa đổi bổ sung Hợp đồng có giá trị pháp lý như Hợp đồng, là một phần không tách rời của Hợp đồng này."
          ),
          new Paragraph(
            "- Hợp đồng được lập thành 02 (hai) bản có giá trị như nhau, mỗi Bên giữ 01 (một) bản để thực hiện."
          ),
          new Paragraph({
            alignment: "center",
            children: [new TextRun({ text: "BÊN CHO THUÊ", bold: true })],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(ký và ghi rõ họ tên)")],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun({ text: "BÊN THUÊ", bold: true })],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("(ký và ghi rõ họ tên)")],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Hop_dong_cho_thue_nha.docx");
  });
}
