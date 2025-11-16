// ----------------------
// DROPDOWN FUNCTIONALITY
// ----------------------
const items = document.querySelectorAll('.dropdown-item');
const rightImage = document.getElementById('clove-image');

items.forEach(item => {
    let header = item.querySelector('.dropdown-header');

    header.addEventListener('click', () => {

        const selectedImage = item.getAttribute('data-image');

        // Close all other dropdowns
        items.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });

        // Toggle current one
        const isActive = item.classList.toggle('active');

        // Update icons
        items.forEach(i => {
            const icon = i.querySelector('.icon');
            icon.src = i.classList.contains('active')
                ? "/assests/minus-sign.png"
                : "/assests/plus-sign.png";
        });

        // Change right-side image only if just opened
        if (isActive) {
            rightImage.classList.add("fade");
            setTimeout(() => {
                rightImage.src = selectedImage;
                rightImage.classList.remove("fade");
            }, 300);
        }

    });
});




// ----------------------
// FORM FUNCTIONALITY
// ----------------------
document.addEventListener("DOMContentLoaded", function () {

    const captchaBtn = document.querySelector(".form-captcha-btn");
    const captchaInput = document.querySelector(".form-captcha");
    const submitBtn = document.querySelector(".right-section-form-submit-btn");
    const checkbox = document.querySelector(".checkbox-image");

    let generatedCaptcha = "";

    // Generate random 4-digit captcha
    function generateCaptcha() {
        generatedCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
        captchaBtn.textContent = generatedCaptcha;
    }

    generateCaptcha(); // initial load

    // Refresh captcha on click
    captchaBtn.addEventListener("click", generateCaptcha);

    // Checkbox toggle
    checkbox.addEventListener("click", function () {
        checkbox.classList.toggle("checked");
        if (checkbox.classList.contains("checked")) {
            checkbox.style.background = "#F58420";
            checkbox.style.borderColor = "#F58420";
        } else {
            checkbox.style.background = "#FFFFFF";
            checkbox.style.borderColor = "#FFE0C4";
        }
    });

    // Handle submit
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const name = document.querySelector('input[placeholder="Name"]').value.trim();
        const mobile = document.querySelector('input[placeholder="Mobile Number"]').value.trim();
        const captchaValue = captchaInput.value.trim(); // <-- Use .value to get user input

        if (!name) {
            alert("Please enter your name.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (captchaValue !== generatedCaptcha) {
            alert("Captcha does not match. Please try again.");
            generateCaptcha();
            return;
        }

        if (!checkbox.classList.contains("checked")) {
            alert("You must agree to the Terms and Privacy Policy.");
            return;
        }

        // SUCCESS
        alert("Form submitted successfully!");
        console.log({ name, mobile, captcha: captchaValue });
    });
});
