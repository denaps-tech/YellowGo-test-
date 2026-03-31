        <script>
            const calculateBtn = document.getElementById("calculateBtn");
            const confirmBtn = document.getElementById("confirmBtn");
            const step1 = document.getElementById("step1");
            const step2 = document.getElementById("step2");
            const priceText = document.getElementById("priceText");
            const driverInfo = document.getElementById("driverInfo");
            const destinationSelect = document.getElementById("destination");

            calculateBtn.addEventListener("click", () => {
                const selectedOption = destinationSelect.selectedOptions[0];
                const destination = selectedOption.value;
                const price = selectedOption.getAttribute("data-price");

                if (!destination) {
                    alert("Please select a destination!");
                    return;
                }

                priceText.textContent = `Estimated Price: GH₵${price}`;
                step1.style.display = "none";
                step2.style.display = "block";
            });

            confirmBtn.addEventListener("click", () => {
                step2.style.display = "none";
                driverInfo.style.display = "block";
                destinationSelect.value = ""; // reset selection
            });
        </script>