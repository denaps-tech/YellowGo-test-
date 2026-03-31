import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// --- Supabase Config ---
const SUPABASE_URL = "https://tlemtlhyoouarcgzkxdd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZW10bGh5b291YXJjZ3preGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcwODAsImV4cCI6MjA5MDM3MzA4MH0.TmaKT3fHoPo3DecVESvsaQ5so5VGWZ_2GZdX8zwK6F4"; 
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Password Toggle ---
const toggleIcon = document.getElementById("togglePasswordIcon");
toggleIcon.addEventListener("click", () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
        input.type = "text";
        toggleIcon.src = "lock.png";
    } else {
        input.type = "password";
        toggleIcon.src = "eye.png";
    }
});

// --- Driver Login Form ---
document.getElementById("driverLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const driverCode = document.getElementById("driverCode").value.trim();
    const password = document.getElementById("password").value;

    if (!fullName || !driverCode || !password) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const { data: drivers, error: fetchError } = await supabase
            .from("drivers")
            .select("*")
            .eq("full_name", fullName)
            .eq("driver_code", driverCode)
            .limit(1);

        if (fetchError) throw fetchError;
        if (!drivers || drivers.length === 0) {
            alert("Driver not found or code does not match");
            return;
        }

        const driver = drivers[0];

        const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email: driver.email,
            password: password,
        });

        if (loginError) throw loginError;

        alert("✅ Login successful!");
        window.location.href = "driverDashboard.html";
    } catch (err) {
        alert("❌ " + err.message);
    }
});

// --- Forgot Password ---
document.querySelector(".ff").addEventListener("click", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const driverCode = document.getElementById("driverCode").value.trim();

    if (!fullName || !driverCode) {
        alert("Enter full name and driver code first to reset password");
        return;
    }

    try {
        const { data: drivers, error: fetchError } = await supabase
            .from("drivers")
            .select("*")
            .eq("full_name", fullName)
            .eq("driver_code", driverCode)
            .limit(1);

        if (fetchError) throw fetchError;
        if (!drivers || drivers.length === 0) {
            alert("Driver not found or code does not match");
            return;
        }

        const driver = drivers[0];

        const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail(
            driver.email,
            { redirectTo: window.location.origin + "/driver-login.html" }
        );

        if (resetError) throw resetError;

        alert("✅ Password reset link sent! Check your email");
    } catch (err) {
        alert("❌ " + err.message);
    }
});