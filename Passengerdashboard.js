<script type="module">
    import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

    // Supabase client
    const supabaseUrl = "https://tlemtlhyoouarcgzkxdd.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZW10bGh5b291YXJjZ3preGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTcwODAsImV4cCI6MjA5MDM3MzA4MH0.TmaKT3fHoPo3DecVESvsaQ5so5VGWZ_2GZdX8zwK6F4";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        alert("Please login first!");
        window.location.href = "passenger-login.html";
    } else {
        const user = session.user.user_metadata?.full_name || session.user.email;
        const usernameSpan = document.getElementById("username");
        if (usernameSpan) usernameSpan.innerText = user;
    }

    // Request ride
    function requestRide() {
        window.location.href = "requestride.html";
    }

    // Logout
    async function logout() {
        await supabase.auth.signOut();
        window.location.href = "passengerlogin.html";
    }

    // Make functions accessible to HTML buttons
    window.requestRide = requestRide;
    window.logout = logout;
</script>