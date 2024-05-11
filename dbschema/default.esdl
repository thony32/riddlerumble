module default {
    type Post {
        required property title -> str;
        required property content -> str {
            default := ""
        };
    }
}