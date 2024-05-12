module default {
    type Post {
        required property content: std::str {
            default := ('');
        };
        required property title: std::str;
    };
}
