/**
 * Chuyển đổi ngày tháng sang định dạng Việt Nam
 * @param {Date|string} date - Ngày tháng cần chuyển đổi
 * @returns {string} Ngày tháng đã được định dạng
 */
export const formatDate = (date) => {
	if (!date) return "";
	const d = new Date(date);
	return d.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

/**
 * Chuyển đổi trạng thái công việc sang tiếng Việt
 * @param {string} status - Trạng thái công việc
 * @returns {string} Trạng thái đã được dịch
 */
export const translateStatus = (status) => {
	const statusMap = {
		pending: "Đang chờ",
		in_progress: "Đang thực hiện",
		completed: "Hoàn thành",
		overdue: "Quá hạn",
		cancelled: "Đã hủy",
	};
	return statusMap[status] || status;
};

/**
 * Kiểm tra xem một ngày có phải là ngày trong quá khứ không
 * @param {Date|string} date - Ngày cần kiểm tra
 * @returns {boolean} true nếu là ngày trong quá khứ
 */
export const isPastDate = (date) => {
	if (!date) return false;
	const d = new Date(date);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return d < today;
};

/**
 * Tạo một chuỗi ngẫu nhiên với độ dài cho trước
 * @param {number} length - Độ dài của chuỗi
 * @returns {string} Chuỗi ngẫu nhiên
 */
export const generateRandomString = (length) => {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

/**
 * Kiểm tra xem một đối tượng có rỗng không
 * @param {Object} obj - Đối tượng cần kiểm tra
 * @returns {boolean} true nếu đối tượng rỗng
 */
export const isEmptyObject = (obj) => {
	return Object.keys(obj).length === 0;
};
