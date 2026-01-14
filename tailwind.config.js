/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // <--- ต้องมีบรรทัดนี้เพื่อให้ปุ่มกดทำงานได้
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}