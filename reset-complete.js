        <script>
            function togglePassword(inputId, iconId) {
                const input = document.getElementById(inputId);
                const icon = document.getElementById(iconId);
                if (input.type === "password") {
                    input.type = "text";
                    icon.src = "lock.png"; // eye for visible
                } else {
                    input.type = "password";
                    icon.src = "eye.png"; // lock for hidden
                }
            }

            function resetPassword() {
                let newPassword = document.getElementById("password").value;
                let confirmPassword =
                    document.getElementById("confirmPassword").value;
                let message = document.getElementById("message");

                // Get stored data (simulate database)
                let driver = JSON.parse(localStorage.getItem("driverData"));
                let storedCode = localStorage.getItem("resetCode");
                let verified = localStorage.getItem("verified");

                if (verified !== "true") {
                    message.innerHTML = "You must verify your code first.";
                    message.className = "error";
                    return;
                }

                if (!newPassword || !confirmPassword) {
                    message.innerHTML = "All fields are required.";
                    message.className = "error";
                    return;
                }

                if (newPassword.length < 8) {
                    message.innerHTML =
                        "Password must be at least 8 characters.";
                    message.className = "error";
                    return;
                }

                if (newPassword !== confirmPassword) {
                    message.innerHTML = "Passwords do not match.";
                    message.className = "error";
                    return;
                }

                driver.password = newPassword;
                localStorage.setItem("driverData", JSON.stringify(driver));

                // Clear reset data
                localStorage.removeItem("resetCode");
                localStorage.removeItem("verified");

                message.innerHTML = "Password reset successful!";
                message.className = "success";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            }
        </script>