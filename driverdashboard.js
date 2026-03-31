        <script type="module">
            import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

            // ===== Supabase Setup =====
            const SUPABASE_URL = "YOUR_SUPABASE_URL";
            const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

            // ===== Elements =====
            const driverNameEl = document.getElementById("driverName");
            const driverCodeEl = document.getElementById("driverCode");
            const driverEmailEl = document.getElementById("driverEmail");
            const driverPhoneEl = document.getElementById("driverPhone");
            const toggleOnlineBtn = document.getElementById("toggleOnlineBtn");
            const logoutBtn = document.getElementById("logoutBtn");

            let isOnline = false;

            // ===== Load Driver Info =====
            async function loadDriver() {
                const user = supabase.auth.user();
                if (!user) {
                    window.location.href = "driverLogin.html";
                    return;
                }

                const { data, error } = await supabase
                    .from("drivers")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.error(error);
                    alert("Driver profile not found!");
                    return;
                }

                driverNameEl.textContent = data.full_name;
                driverCodeEl.textContent = data.driver_code;
                driverEmailEl.textContent = data.email;
                driverPhoneEl.textContent = data.phone;
                isOnline = data.online;
                updateToggleButton();
            }

            // ===== Update Toggle Button =====
            function updateToggleButton() {
                toggleOnlineBtn.textContent = isOnline
                    ? "Go Offline"
                    : "Go Online";
                toggleOnlineBtn.classList.toggle("online", isOnline);
            }

            // ===== Toggle Online/Offline =====
            toggleOnlineBtn.addEventListener("click", async () => {
                const user = supabase.auth.user();
                if (!user) return;

                isOnline = !isOnline;
                updateToggleButton();

                const { error } = await supabase
                    .from("drivers")
                    .update({ online: isOnline })
                    .eq("id", user.id);

                if (error) console.error("Error updating status:", error);
            });

            // ===== Logout =====
            logoutBtn.addEventListener("click", async () => {
                const { error } = await supabase.auth.signOut();
                if (error) console.error(error);
                window.location.href = "driverLogin.html";
            });

            // ===== Initial Load =====
            loadDriver();
        </script>