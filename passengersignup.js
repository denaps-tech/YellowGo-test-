<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.30.0/dist/supabase.min.js"></script>
<script>
    // Supabase Config
    const SUPABASE_URL = "https://tlemtlhyoouarcgzkxdd.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZW10bGh5b291YXJjZ3preGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcwODAsImV4cCI6MjA5MDM3MzA4MH0.TmaKT3fHoPo3DecVESvsaQ5so5VGWZ_2GZdX8zwK6F4"; // keep your full key here

    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Password Toggle
    function togglePassword(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);

        if (input.type === "password") {
            input.type = "text";
            icon.src = "eye.png";
        } else {
            input.type = "password";
            icon.src = "lock.png";
        }
    }

    // Form Submit
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("full_name").value.trim();
        const phone_number = document.getElementById("phone_number").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm_password").value;

        // Check password match
        if (password !== confirm) {
            document.getElementById("errorMsg").style.display = "block";
            return;
        } else {
            document.getElementById("errorMsg").style.display = "none";
        }

        try {
            // Sign up user (Auth)
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: full_name,
                        phone_number: phone_number
                    }
                }
            });

            if (error) throw error;

            alert("✅ Signup successful! Check your email.");
            form.reset();

        } catch (err) {
            alert("❌ " + err.message);
        }
    });
</script>