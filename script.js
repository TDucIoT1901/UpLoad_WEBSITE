// --- TÍNH NĂNG 1: ĐỔI GIAO DIỆN DARK / LIGHT MODE ---
const themeToggle = document.getElementById('theme-toggle');

// Chỉ chạy code nếu trang hiện tại có nút theme-toggle
if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    // Kiểm tra và áp dụng giao diện đã lưu trong localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark' && icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Lắng nghe sự kiện click nút đổi giao diện
    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Lưu trạng thái để khi chuyển trang không bị mất
    });
}


// --- TÍNH NĂNG 2: XỬ LÝ SỰ KIỆN FORM LIÊN HỆ ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Chỉ chạy code nếu trang hiện tại có contact-form (Ví dụ trang contact.html)
if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn tải lại trang

        const userName = document.getElementById('name').value;

        formStatus.textContent = `Cảm ơn ${userName}! Lời nhắn của bạn đã được gửi thành công.`;
        formStatus.classList.remove('hidden');
        formStatus.classList.add('success');

        contactForm.reset(); // Xóa trắng form

        setTimeout(() => {
            formStatus.classList.add('hidden');
            formStatus.classList.remove('success');
        }, 4000);
    });
}
// --- TÍNH NĂNG 3: ĐẾM VÀ HIỂN THỊ LƯỢT TRUY CẬP (CÓ LOẠI TRỪ BẢN THÂN) ---
const visitCountElement = document.getElementById('visit-count');

if (visitCountElement) {
    const namespace = "duc-portfolio-2026";
    const key = "homepage";

    // 1. Kiểm tra xem trên URL có đuôi bí mật "?me=true" không
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('me') === 'true') {
        localStorage.setItem('exclude_me', 'true');
        alert('Đã kích hoạt chế độ ẩn danh cho máy này! Từ giờ lượt truy cập từ đây sẽ không bị tính.');
    }

    // 2. Kiểm tra xem máy tính này đã được đánh dấu loại trừ chưa
    const isExcluded = localStorage.getItem('exclude_me') === 'true';

    // Nếu đã loại trừ, chỉ lấy số lượng về xem (GET) chứ không tăng số lượng (/up)
    const endpoint = isExcluded 
        ? `https://api.counterapi.dev/v1/${namespace}/${key}` 
        : `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            visitCountElement.textContent = data.count;
        })
        .catch(error => {
            console.error("Không thể tải lượt truy cập:", error);
            visitCountElement.textContent = "1";
        });
}