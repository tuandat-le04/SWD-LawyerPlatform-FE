import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export function exportServiceContractFormToWord() {
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
            children: [new TextRun("Độc lập – Tự do – Hạnh phúc")],
          }),
          new Paragraph({
            alignment: "center",
            children: [new TextRun("HỢP ĐỒNG CUNG CẤP DỊCH VỤ BẢO VỆ")],
          }),
          new Paragraph("Số : /HĐBV/20..."),
          new Paragraph("Căn cứ ………………………"),
          new Paragraph("Căn cứ nhu cầu và khả năng đáp ứng của mỗi bên."),
          new Paragraph("Hôm nay, ngày …. tháng …. năm 20...,"),
          new Paragraph("Tại :"),
          new Paragraph({ text: "Hai bên gồm:", bold: true }),
          new Paragraph({ text: "BÊN A: (Bên thuê dịch vụ)", bold: true }),
          new Paragraph("Trụ sở :"),
          new Paragraph("Điện thoại :"),
          new Paragraph("Mã số thuế :"),
          new Paragraph("Người đại diện :"),
          new Paragraph({ text: "BÊN B: (Bên cung cấp dịch vụ)", bold: true }),
          new Paragraph("Trụ sở :"),
          new Paragraph("Điện thoại :"),
          new Paragraph("Mã số thuế :"),
          new Paragraph("Người đại diện :"),
          new Paragraph({
            text: "Sau khi trao đổi, thỏa thuận, hai bên đồng ý ký hợp đồng này với các điều khoản như sau:",
            bold: true,
          }),
          new Paragraph({
            text: "Điều 1: NỘI DUNG DỊCH VỤ BẢO VỆ",
            bold: true,
          }),
          new Paragraph(
            "1.1. Bên A yêu cầu và bên B đồng ý cung cấp dịch vụ bảo vệ tại khu vực:"
          ),
          new Paragraph("Địa chỉ:"),
          new Paragraph(
            "Thời hạn hợp đồng: ,,,,,, năm ( từ ngày …………. đến ngày ……………. )."
          ),
          new Paragraph(
            "Thời gian bảo vệ: nguyên ngày (24/24), kể cả Lễ , Tết và Chủ Nhật."
          ),
          new Paragraph("Số vị trí bảo vệ : …………."),
          new Paragraph("Việc bảo vệ hằng ngày được chia thành 3 ca như sau :"),
          new Paragraph("- Ca 1 : từ 06h00 đến 14h00 : 01 bảo vệ."),
          new Paragraph("- Ca 2 : từ 14h00 đến 22h00 : 01 bảo vệ."),
          new Paragraph(
            "- Ca 3 : từ 22h00 đến 06h00 sáng hôm sau : 02 bảo vệ."
          ),
          new Paragraph(
            "1.2 Để thực hiện, bên B cử ….. nhân viên bảo vệ chuyên nghiệp, đã được huấn luyện nghiệp vụ chuyên môn và đủ điều kiện như sau :"
          ),
          new Paragraph(
            "• Lý lịch rõ ràng, không có tiền án tiền sự, có đạo đức nghề nghiệp."
          ),
          new Paragraph("• Các kỹ năng giám sát cơ bản."),
          new Paragraph("• Nghiệp vụ ứng phó trong tình huống khẩn cấp."),
          new Paragraph("• Nghiệp vụ cấp cứu, phòng cháy, chữa cháy."),
          new Paragraph(
            "• Võ thuật, cách sử dụng công cụ hỗ trợ ( đèn pin, bộ đàm, sổ sách … )"
          ),
          new Paragraph("• Nghiệp vụ bảo vệ an ninh"),
          new Paragraph(
            "1.3. Số lượng vị trí bảo vệ có thể sẽ được xem xét và điều chỉnh để phục vụ tốt hơn mục tiêu đề ra."
          ),
          new Paragraph({
            text: "Điều 2 : PHÍ DỊCH VỤ, THỜi GIAN VÀ HÌNH THỨC THANH TOÁN",
            bold: true,
          }),
          new Paragraph(
            "2.1. Phí dịch vụ bảo vệ là : ………. đồng/tháng. Chưa bao gồm 10% thuế VAT."
          ),
          new Paragraph(
            "2.2. Thời gian thanh toán: từ ngày ….. đến ngày ….. hàng tháng. Khi nhận tiền, bên B có trách nhiệm xuất hoá đơn tài chính theo quy định cho bên A."
          ),
          new Paragraph(
            "2.3. Hình thức thanh toán: tiền mặt hoặc chuyển khoản vào tài khoản của bên B theo chi tiết sau :"
          ),
          new Paragraph("Tên Tài khoản ngân hàng:"),
          new Paragraph("Số tài khoản:"),
          new Paragraph("Ngân hàng:"),
          new Paragraph({
            text: "Điều 3 : TRÁCH NHIỆM CỦA NHÂN VIÊN BẢO VỆ",
            bold: true,
          }),
          new Paragraph(
            "Nhân viên bảo vệ của bên B có trách nhiệm thực hiện các nhiệm vụ sau :"
          ),
          new Paragraph(
            "3.1. Chấp hành nghiêm mọi quy định, nội quy của Công ty."
          ),
          new Paragraph(
            "3.2. Chỉ cho phép những người có phận sự vào – ra khu vực Công ty."
          ),
          new Paragraph(
            "3.3. Kiểm tra và phát hiện các hành vi hủy hoại, trộm cắp tài sản của Công ty. Ngăn chặn kịp thời và báo ngay cho bên A về những hành động phá rối, hành vi vi phạm pháp luật xảy ra tại Công ty."
          ),
          new Paragraph(
            "3.4. Được sử dụng các biện pháp nghiệp vụ và những công cụ hỗ trợ để kiểm tra các loại phương tiện của nhân viên ra vào Công ty."
          ),
          new Paragraph(
            "3.5. Khi xảy ra sự cố, sử dụng các biện pháp phòng cháy, chữa cháy hoặc sơ cứu tạm thời ... trong phạm vi Công ty cho đến lúc có đầy đủ các phương tiện hỗ trợ, cứu giúp ... đến tại hiện trường."
          ),
          new Paragraph(
            "3.6. Lập và ghi chép chính xác, đầy đủ sổ trực, biên bản giao ca hàng ngày, Sổ danh sách khách đến Công ty và trình cho bên A khi được yêu cầu."
          ),
          new Paragraph(
            "3.7. Nhiệm vụ cụ thể của các nhân viên bảo vệ như sau :"
          ),
          new Paragraph(
            "• Kiểm tra, giám sát việc bấm thẻ chấm công hàng ngày đối với công nhân tại Công ty."
          ),
          new Paragraph(
            "• Bảo vệ, giữ gìn trật tự - an ninh tại khu vực Công ty."
          ),
          new Paragraph(
            "• Kiểm tra, giám sát việc hàng hoá & khách ra vào theo đúng quy định của Công ty."
          ),
          new Paragraph(
            "• Thông báo với các bộ phận liên quan hay tiếp tân của Công ty khi có khách đến liên hệ công tác."
          ),
          new Paragraph(
            "• Hàng ngày nhận thư báo, tài liệu ... gửi đến công ty."
          ),
          new Paragraph({
            text: "Điều 4 : QUYỀN VÀ NGHĨA VỤ CỦA BÊN A",
            bold: true,
          }),
          new Paragraph(
            "4.1. Tạo điều kiện thuận lợi cho bên B thực hiện công việc của mình."
          ),
          new Paragraph(
            "4.2. Bên A thừa nhận rằng hợp đồng này chỉ thực hiện Dịch Vụ Bảo Vệ và không phải là một hợp đồng Bảo Hiểm."
          ),
          new Paragraph(
            "4.3. Trong thời gian bên B thực hiện nhiệm vụ, bên A chỉ định một đại diện có trách nhiệm để tiếp nhận những yêu cầu và báo cáo của bên B liên quan đến an ninh của Công ty."
          ),
          new Paragraph(
            "4.4. Có trách nhiệm thông báo cho bên B bằng miệng hay bằng văn bản về bất cứ mối nguy hiểm nào của nhân viên bảo vệ bên B mà bên A xét thấy có khả năng đe dọa hay làm ảnh hưởng đến tình hình an ninh tại Công ty của bên A."
          ),
          new Paragraph(
            "4.5. Bên A sẽ hỗ trợ những yêu cầu của bảo vệ bên B nhằm cải thiện hoặc thực thi những biện pháp an ninh tại Công ty."
          ),
          new Paragraph("4.6. Thanh toán phí dịch vụ như đã thỏa thuận."),
          new Paragraph(
            "4.7. Các quyền và nghĩa vụ khác của bên thuê dịch vụ theo qui định của pháp luật."
          ),
          new Paragraph({
            text: "Điều 5 : QUYỀN VÀ NGHĨA VỤ CỦA BÊN B",
            bold: true,
          }),
          new Paragraph(
            "5.1. Chỉ định một người đại diện để làm việc với bên A. Liên đới chịu trách nhiệm trong trường hợp nhân viên của mình có hành vi trái pháp luật, thiếu trách nhiệm, gây thiệt hại cho bên A."
          ),
          new Paragraph(
            "5.2. Trang bị đồng phục, trang thiết bị bảo vệ cần thiết cho lực lượng bảo vệ của mình trong quá trình làm nhiệm vụ."
          ),
          new Paragraph(
            "5.3. Luôn bố trí đầy đủ số lượng nhân viên bảo vệ trong toàn bộ thời gian đảm nhiệm công việc (kể cả việc chuẩn bị, bố trí nhân viên dự phòng, kịp thời bổ sung, hỗ trợ trong trường hợp cần thiết)."
          ),
          new Paragraph(
            "5.4. Giao tiếp với cán bộ công nhân viên và khách của Công ty với phong cách lịch thiệp. Nỗ lực duy trì mối quan hệ tốt trong khu vực địa phương và trong Công ty."
          ),
          new Paragraph(
            "5.5. Có trách nhiệm bảo vệ an ninh trật tự trong phạm vi khu vực cổng Công ty."
          ),
          new Paragraph(
            "5.6. Thường xuyên, kịp thời báo cáo cho bên A những vấn đề liên quan đến nhiệm vụ bảo vệ của mình, những tai nạn, rủi ro hoặc sự việc bất thường diễn ra trong khu vực Công ty. Có trách nhiệm báo cáo cho bên A về mọi vấn đề liên quan khi được yêu cầu."
          ),
          new Paragraph(
            "5.7. Chịu trách nhiệm đối với các khoản thuế, bảo hiểm, các phúc lợi xã hội theo pháp luật lao động đối với nhân viên của mình được bổ nhiệm làm nhiệm vụ tại Công ty của bên A."
          ),
          new Paragraph(
            "5.8. Cung cấp kịp thời lực lượng hỗ trợ khi được bên A yêu cầu. Việc thay đổi nhân viên không đáp ứng yêu cầu nghiệp vụ phải báo trước bằng văn bản và chỉ được thay khi có sự đồng ý của bên A."
          ),
          new Paragraph(
            "5.9. Các quyền và nghĩa vụ khác của bên cung ứng dịch vụ theo qui định của pháp luật."
          ),
          new Paragraph({
            text: "Điều 6 : TRÁCH NHIỆM BỒI THƯỜNG CỦA BÊN B",
            bold: true,
          }),
          new Paragraph(
            "6.1. Bên B chịu trách nhiệm bồi thường về những thiệt hại tại khu vực Công ty được giao bảo vệ nếu do lỗi sơ ý, thiếu trách nhiệm hay không thực hiện tốt nhiệm vụ được giao, để kẻ gian lấy cắp tài sản ... của nhân viên bên B gây ra cho bên A."
          ),
          new Paragraph(
            "6.2. Việc bồi thường được tính theo giá thị trường vào thời điểm xảy ra những thiệt hại. Trong vòng 30 ngày kể từ khi nhận được tài liệu kê khai tài sản bị thiệt hại do bên A cung cấp, nếu bên B chưa hoàn tất việc bồi thường thì phải chịu hình thức phạt 0.05%/ số tiền bồi thường chưa trả/ số ngày chậm thanh toán."
          ),
          new Paragraph(
            "6.3. Bên B không chịu trách nhiệm bồi thường nếu đã thông báo trước bằng văn bản về những khuyến cáo, hay những điều nguy hiểm đáng nghi ngờ sẽ xảy ra cho bên A mà bên A không khắc phục triệt để."
          ),
          new Paragraph(
            "6.4. Bên B cũng tuyệt đối không bảo vệ cho bất cứ hành vi nào của bên A nếu xét thấy hành vi đó vi phạm pháp luật."
          ),
          new Paragraph({ text: "Điều 7 : NHỮNG THỎA THUẬN KHÁC", bold: true }),
          new Paragraph(
            "7.1 Bên A cam kết không tuyển dụng bất kỳ nhân viên bảo vệ nào của bên B sang làm việc cho bên A trong khi hai bên chưa chấm dứt hợp đồng cung cấp dịch vụ bảo vệ."
          ),
          new Paragraph(
            "7.2 Nhân viên của bên B không được phép tiết lộ về công nghệ, kỹ thuật cũng như những thông tin về tài sản hay những bí mật riêng của bên B dưới mọi hình thức cho bất cứ ai."
          ),
          new Paragraph(
            "7.3 Cả hai bên có thể chấm dứt hoặc gia hạn hợp đồng trước thời hạn bằng văn bản báo trước cho bên kia 15 ngày kể từ ngày ghi trên hợp đồng. Mỗi bên có quyền đề xuất bằng văn bản việc chấm dứt hợp đồng nếu xét thấy bên kia vi phạm nghiêm trọng nội dung được nêu trong hợp đồng."
          ),
          new Paragraph(
            "7.4 Trước khi thời hạn hợp đồng kết thúc 15 ngày, nếu hai bên vẫn muốn duy trì hợp đồng thì phải gặp nhau để ký hợp đồng mới hoặc ký phụ lục gia hạn hợp đồng đã ký."
          ),
          new Paragraph({ text: "Điều 8 : ĐIỀU KHOẢN CHUNG", bold: true }),
          new Paragraph(
            "Trong quá trình thực hiện hợp đồng, nếu có phát sinh tranh chấp, hai bên sẽ thương thảo giải quyết. Nếu tranh chấp không thể giải quyết được sẽ được đưa ra Tòa án có thẩm quyền tại TP. Hồ Chí Minh giải quyết. Quyết định của Tòa án là quyết định cuối cùng, bên bên thua kiện phải chi trả án phí và chi phí luật sư cho bên kia."
          ),
          new Paragraph(
            "Bên cạnh những điều kiện và điều khoản đã nêu trong hợp đồng này nếu bên A có nhu cầu tăng thêm bảo vệ, bên B sẵn sàng giải quyết để giữ mối quan hệ hai bên luôn tốt đẹp"
          ),
          new Paragraph(
            "Hợp đồng này được lập thành 02 (hai) bản, mỗi bên giữ 01 (một) bản. Có giá trị pháp lý như nhau."
          ),
          new Paragraph({
            text: "ĐẠI DIỆN BÊN A",
            bold: true,
            alignment: "center",
          }),
          new Paragraph({
            text: "ĐẠI DIỆN BÊN B",
            bold: true,
            alignment: "center",
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const file = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(file, "Hop_Dong_Dich_Vu_Bao_Ve.docx");
  });
}
