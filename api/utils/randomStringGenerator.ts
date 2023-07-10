export function generateRandomString(myLength: number): string {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        () => chars[Math.floor(Math.random() * chars.length)]
    );
    return randomArray.join("");
}