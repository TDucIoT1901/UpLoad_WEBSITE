// --- TÍNH NĂNG 1: ĐỔI GIAO DIỆN DARK / LIGHT MODE ---
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Kiểm tra xem người dùng trước đó đã từng chọn chế độ nào chưa
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Lắng nghe sự kiện click vào nút đổi giao diện
themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';

    if (currentTheme !== 'dark') {
        newTheme = 'dark';
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Lưu tùy chọn vào trình duyệt
});


// --- TÍNH NĂNG 2: XỬ LÝ SỰ KIỆN FORM LIÊN HỆ ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn trang web tải lại dữ liệu theo cách mặc định

    // Lấy thông tin người dùng nhập vào
    const userName = document.getElementById('name').value;

    // Hiển thị thông báo phản hồi đẹp mắt ngay trên màn hình
    formStatus.textContent = `Cảm ơn ${userName}! Lời nhắn của bạn đã được gửi thành công.`;
    formStatus.classList.remove('hidden');
    formStatus.classList.add('success');

    // Xóa trắng các ô nhập liệu sau khi gửi thành công
    contactForm.reset();

    // Tự động ẩn thông báo sau 4 giây
    setTimeout(() => {
        formStatus.classList.add('hidden');
        formStatus.classList.remove('success');
    }, 4000);
});