import React, { useState } from "react";
import { Star, Send, MessageCircle } from "lucide-react";

// Component form để khách hàng điền feedback
const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        rating: 0,
        comment: ""
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Lấy userid từ localStorage (giả lập), hoặc truyền qua props/context
    const userId = localStorage.getItem("userId") || 1;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Gửi dữ liệu đúng cấu trúc database
            const feedbackData = {
                userid: userId,
                rating: formData.rating,
                comment: formData.comment
            };
            console.log("Feedback submitted:", feedbackData);
            setIsSubmitting(false);
            setSubmitSuccess(true);

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    rating: 0,
                    comment: ""
                });
                setSubmitSuccess(false);
            }, 3000);
        }, 2000);
    };

    const renderStars = () => {
        return [...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
                <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingClick(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 transform hover:scale-110"
                >
                    <Star
                        className={`h-8 w-8 ${starValue <= (hoveredRating || formData.rating)
                            ? "text-amber-400 fill-current"
                            : "text-gray-500 hover:text-amber-300"
                            }`}
                    />
                </button>
            );
        });
    };

    if (submitSuccess) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-green-900/30 border border-green-700 rounded-3xl p-12 text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Cảm ơn bạn đã gửi phản hồi!
                        </h3>
                        <p className="text-gray-300 text-lg">
                            Chúng tôi đã nhận được đánh giá của bạn và sẽ sử dụng nó để cải thiện dịch vụ.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2">GỬI PHẢN HỒI</h3>
                    <p className="text-gray-400">Chia sẻ ý kiến của bạn để chúng tôi phục vụ tốt hơn!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-white font-semibold mb-3">Đánh giá của bạn *</label>
                        <div className="flex items-center space-x-2 mb-2">{renderStars()}</div>
                        <p className="text-gray-400 text-sm">
                            {formData.rating === 0 && "Vui lòng chọn số sao đánh giá"}
                            {formData.rating === 1 && "Rất không hài lòng"}
                            {formData.rating === 2 && "Không hài lòng"}
                            {formData.rating === 3 && "Bình thường"}
                            {formData.rating === 4 && "Hài lòng"}
                            {formData.rating === 5 && "Rất hài lòng"}
                        </p>
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-3">Nội dung phản hồi *</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 resize-none"
                            placeholder="Chia sẻ trải nghiệm, góp ý hoặc đánh giá của bạn..."
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || formData.rating === 0}
                            className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-semibold rounded-xl hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-3"></div>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5 mr-3" />
                                    Gửi phản hồi
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">Chúng tôi cam kết bảo mật thông tin của bạn.</p>
                </div>
            </div>
        </section>
    );
};

export default FeedbackForm;