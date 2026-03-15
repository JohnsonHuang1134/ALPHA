const submitBtn = document.querySelector('#submit_btn');
if(submitBtn){
    document.querySelector('#submit_btn').addEventListener('click',function(){
        let isValid = true;
        document.querySelectorAll('.contact_input[required], .contact_textarea[required]').forEach(function (el) {
            const box = el.closest('.contact_input_box');
            if (el.value.trim() === '') {
                box.classList.add('--error');
                isValid = false;
            } else {
                box.classList.remove('--error');
            }
        });

        if (isValid) {
            document.querySelector('#error_notice').classList.remove('--show');
            const formData = new FormData();
            document.querySelectorAll('.contact_input, .contact_textarea').forEach(el => { formData.append(el.name, el.value);});
            fetch('send.php', { method: 'POST', body: formData });
            document.querySelector('#contact_form').classList.add('--hide');
            document.querySelector('#thank_container').classList.add('--show');    
        } else {
            document.querySelector('#error_notice').classList.add('--show');
        }
    });
}


const subBtn = document.querySelector('#sub_btn');
if(subBtn){
    document.querySelector('#sub_btn').addEventListener('click', function(e) {
        e.preventDefault();

        const inputBox = document.querySelector('#inputBox');
        const emailIpt = document.querySelector('#emailIpt');
        const subscribeBox = document.querySelector('#subscribeBox');
        const sendFully = document.querySelector('#sendFully');
        const email = emailIpt.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            inputBox.classList.add('--error');
            return;
        }

        // 移除錯誤
        inputBox.classList.remove('--error');

        subscribeBox.classList.add('--hide');
        sendFully.classList.add('--show');
    });
}
