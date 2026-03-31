        <script>
            const form = document.getElementById("forgotForm");
            const messageDiv = document.getElementById("message");

            form.addEventListener("submit", async e => {
                e.preventDefault();
                messageDiv.textContent = "";

                const name = document.getElementById("name").value.trim();
                const driverCode = document
                    .getElementById("driverCode")
                    .value.trim();

                if (!name || !driverCode) {
                    messageDiv.textContent = "Please fill all fields";
                    messageDiv.className = "message error";
                    return;
                }

                try {
                    const response = await fetch("/forgot-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, driverCode })
                    });
                    const data = await response.json();
                    if (data.success) {
                        messageDiv.textContent = "Driver verified! OTP sent.";
                        messageDiv.className = "message";
                        // Save driver ID to localStorage to use in OTP page
                        localStorage.setItem("driverId", data.driverId);
                        setTimeout(() => {
                            window.location.href = "verify-otp.html";
                        }, 1500);
                    } else {
                        messageDiv.textContent =
                            data.message || "Verification failed";
                        messageDiv.className = "message error";
                    }
                } catch (err) {
                    messageDiv.textContent = "Server error";
                    messageDiv.className = "message error";
                }
            });
        </script>