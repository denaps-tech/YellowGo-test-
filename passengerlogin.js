import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase config
const supabaseUrl = "https://tlemtlhyoouarcgzkxdd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZW10bGh5b291YXJjZ3preGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcwODAsImV4cCI6MjA5MDM3MzA4MH0.TmaKT3fHoPo3DecVESvsaQ5so5VGWZ_2GZdX8zwK6F4";
const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("passengerLoginForm");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const input = document.getElementById("email_or_phone").value.trim();
    const password = document.getElementById("password").value;

    if(!input || !password){
        alert("Please fill all fields.");
        return;
    }

    try {
        let emailToUse;

        // Determine if input is email or phone
        if(input.includes("@")){
            emailToUse = input; // It's an email
        } else {
            // Look up email from phone number
            const { data, error } = await supabase
                .from("passengers")
                .select("email")
                .eq("phone_number", input)
                .single();

            if(error || !data){
                throw new Error("Phone number not found");
            }

            emailToUse = data.email;
        }

        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailToUse,
            password
        });

        if(error) throw error;

        alert("Login successful! Welcome back.");
        window.location.href = "passengerDashboard.html";

    } catch(err){
        console.error(err);
        alert(err.message || "Login failed");
    }
});