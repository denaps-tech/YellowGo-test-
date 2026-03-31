// driver-signup.js

// -------------------------
// Supabase Config
// -------------------------
const supabaseUrl = "https://tlemtlhyoouarcgzkxdd.supabase.co"; // <-- your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZW10bGh5b291YXJjZ3preGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcwODAsImV4cCI6MjA5MDM3MzA4MH0.TmaKT3fHoPo3DecVESvsaQ5so5VGWZ_2GZdX8zwK6F4"; // <-- your Supabase anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// -------------------------
// Password Toggle
// -------------------------
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === "password") {
        input.type = "text";
        icon.src = "lock.png";
    } else {
        input.type = "password";
        icon.src = "eye.png";
    }
}

// -------------------------
// Generate unique driver code
// -------------------------
function generateDriverCode() {
    return "DR" + Math.floor(10000000 + Math.random() * 90000000);
}

// -------------------------
// Handle signup
// -------------------------
document.getElementById("driverSignUpForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Terms check
    if (!document.getElementById("terms").checked) {
        alert("You must agree to Terms & Conditions");
        return;
    }

    // Collect form values
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const momoNumber = document.getElementById("momoNumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const ghanaCard = document.getElementById("ghanaCard").value;
    const driverCode = generateDriverCode();

    try {
        // Sign up user in Supabase Auth
        const { data: user, error: signUpError } = await supabase.auth.signUp({
            email: email || `${phoneNumber}@yellowgo.com`,
            password: password
        });
        if (signUpError) throw signUpError;

        // Insert driver info into 'drivers' table
        const { error: insertError } = await supabase.from("drivers").insert([
            {
                id: user.user.id,
                full_name: fullName,
                phone_number: phoneNumber,
                momo_number: momoNumber,
                email: email,
                vehicle_number: vehicleNumber,
                ghana_card: ghanaCard,
                driver_code: driverCode
            }
        ]);
        if (insertError) throw insertError;

        alert(`Driver registered successfully!\nYour Driver Code: ${driverCode}`);
        window.location.href = "driver-login.html";

    } catch (err) {
        alert(err.message);
    }
});