const NavLinks = [
    "[:docs_link]Learn",
    "[:docs_link]Docs",
    "[:docs_link]Reference",
    "[:link https://github.com/equneko/elode/tree/main/example/v2.0] Example",
    "[:link https://chat.whatsapp.com/GnTCmu2sjGlGJs2cnt4GnH] Community",
    "[:github_link] <span.medium.fa.fa-github>",
    "[:link https://github.com/equneko/elode/stargazers] " +
    "<span.fa.fa-star> <span[style font-size:9pt] {$stargazer}>",
    "{html $darkSpan}",
    "[:link https://github.com/equneko/elode/releases/tag/v2.0] " +
    "<span.medium.fa.fa-download> <span[style font-size:9pt] v2.0>",
    "{html $sideSpan}",
],
devs = [
    "https://pps.whatsapp.net/v/t61.24694-24/346897446_2444024912414790_8302301259971813308_n.jpg?ccb=11-4&oh=01_AdQ3TPaU5oltv2e88EKluCubDUNCSNbkDrQZYdHzHwsL2g&oe=64AA724C",
    "https://scontent.fcgk3-2.fna.fbcdn.net/v/t39.30808-6/333604896_1987057801495581_4408880671083462446_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHkrvIYaT494GJEnB1r-1dLJfW1_wKhOxgl9bX_AqE7GOWBx0DAoRetfCrz4_vQGZlbqMRlGVjshByb2588qlU_&_nc_ohc=8uk7UUuo3x4AX9-icZN&_nc_zt=23&_nc_ht=scontent.fcgk3-2.fna&oh=00_AfA5ydV1jR3hEcXHlaw4tCEvE5jmoaoUx1kpRrZ3UsWYsA&oe=64A33B04",
    "https://pps.whatsapp.net/v/t61.24694-24/212876418_333228348285185_3112125496364721239_n.jpg?ccb=11-4&oh=01_AdQROKi8v_lhnvh8Wv0x3x4VOPayA3A41DtDuqwG0HyX_A&oe=64AA8860",
    "https://pps.whatsapp.net/v/t61.24694-24/247489062_276207104529571_8520361568215759458_n.jpg?ccb=11-4&oh=01_AdRuRN6dy00bZZGwWJG3wpfWOBmd4GPaAylgCFdG4BHFYQ&oe=64AA717E",
    "https://pps.whatsapp.net/v/t61.24694-24/343922909_1367110727192212_2751505412663114921_n.jpg?ccb=11-4&oh=01_AdSQxr6CJhfQWXlp3xsHvDgITf_irst-ImeEvPS0AbJedg&oe=64AA85C9",
    "https://scontent.fcgk3-2.fna.fbcdn.net/v/t39.30808-6/327043935_6015342811837784_7599685354632291744_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHRZv8OWTJ2HQu8KkMzLXP3anhbF1snEcdqeFsXWycRx_F1akjg9AmwA6aqe0XbySDCSb1LIhi3IfDtB8xZRDZ_&_nc_ohc=N14kDT1k9u0AX9SRC00&_nc_zt=23&_nc_ht=scontent.fcgk3-2.fna&oh=00_AfAxyfvBugqyWwKJBD7wZ362zaDCFak8JoLwbkqEqfbXwA&oe=64A2EA1D",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/346938865_178601574845249_2134153380493012230_n.jpg?ccb=11-4&oh=01_AdR7x46aBLjYLKWGYrldNrRDDeBa0k3737YAxTMJP_i-4g&oe=64AA725A",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/354655950_652995290182201_8816429831816682299_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdR3CsJjC-xFBUje1mai3wviUezx-v6x_r9kwa1OZdbrIQ&oe=64AA55E8",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/353102058_168760992855990_820429132719490090_n.jpg?ccb=11-4&oh=01_AdTN6yCKSOBh3utz_vid-2E2ArLD_N5ooAJjNstIlnX8XA&oe=64A9E606",
    "https://pps.whatsapp.net/v/t61.24694-24/341570095_496011579276205_6894345429497711949_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTebgKjYV82xk79FIpLiQ7p1rdzvxCVJFeIVw773XsPuQ&oe=64AA5E5E",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/356031905_1002611270900982_6852749669977236559_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRw6B4tXNeXesFhI0FuMV5szROtmxRN-tQCsR8-YmwD8g&oe=64AA80EA",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/345025332_1380775749434788_4946863572979003777_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTKaTqJ2Ax0zP0x6TFe-UwUhIKAv49nkHTGv4YNURRzYQ&oe=64A9A95B",
    "https://pps.whatsapp.net/v/t61.24694-24/351428898_166068399662297_6754532948036977637_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTL6Onm6FmC3VwyevX3fdNFLXyTngMo6pVYhKH9uYp4AQ&oe=64AA7BE4",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "res/images/no-profile.png",
    "https://pps.whatsapp.net/v/t61.24694-24/341442039_959730798793708_1475162040899102252_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRa8h5LZouGfjIMR-jMlqxIfjW9J3k9bjKj5Uh6wpdexA&oe=64A9B6D9",
    "https://pps.whatsapp.net/v/t61.24694-24/317776194_530672162579669_1904951367112372765_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdQTYjDbcrcZQV7g6mtknIaWrxmoEFUK2W5tgVdrEbZYdQ&oe=64AA78CE"
];