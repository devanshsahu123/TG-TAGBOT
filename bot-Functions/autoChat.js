const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function autoChat(messageObj) {
    try {
        let replyMsg;   
           console.log("checking text match to reply..");
        switch (messageObj?.text?.toLowerCase()) {
            case "hi":
            case "hii":
            case "hay":
            case "hello":
                replyMsg = 'Hello! How are you?';
                break;
            case "kya ho rha he":
            case "kya kr rhi ho":
            case "kya kar rahi ho":
            case "kaise ho":
            case "kaise hain":
            case "kese ho":
                replyMsg = 'Main theek hoon, aap kaise hain?';
                break;
            case "khana kha liya kya":
            case "khana khaya":
            case "dinner kiya":
            case "din=nner kr liyaa kya aapne":
                replyMsg = 'Nahi, abhi nahi khaane jaaungi';
                break;
            case "good morning":
            case "good moring":
            case "morning":
                replyMsg = 'Good morning! Have a great day!';
                break;
            case "good night":
            case "good nyt":
            case "nyt":
                replyMsg = 'Good night! Sweet dreams!';
                break;
            case "aaj kya kiya":
            case "aaj kya kar rahe ho":
            case "aaj kya kar rahi ho":
                replyMsg = 'Bas kaam aur thoda relax kiya, aapne?';
                break;
            case "kal kya plans hain":
            case "kal kya karoge":
            case "kal kya kar rahi ho":
                replyMsg = 'Abhi tak kuch decide nahi kiya, aapke plans?';
                break;
            case "film dekhi":
            case "movie dekhi":
            case "koi movie dekhi":
                replyMsg = 'Haan, kal hi dekhi, aapne?';
                break;
            case "favorite movie":
            case "fav movie":
            case "favourite film":
                replyMsg = 'Mujhe Inception bohot pasand hai, aapko?';
                break;
            case "favorite food":
            case "fav food":
            case "kya pasand hai khane me":
                replyMsg = 'Mujhe pizza bohot pasand hai, aapko?';
                break;
            case "tell me a joke":
            case "joke sunao":
            case "mujhe joke batao":
                replyMsg = 'Sure! Why did the scarecrow win an award? Because he was outstanding in his field!';
                break;
            case "how was your day?":
            case "din kaisa tha?":
            case "aapka din kaisa tha?":
                replyMsg = 'It was good, thank you! How was yours?';
                break;
            case "what's new?":
            case "kya naya hai?":
            case "kuch naya hai?":
                replyMsg = 'Not much, just the usual. What about you?';
                break;
            // Add more cases to reach 1000 unique combinations
            case "how old are you?":
            case "tum kitne saal ke ho?":
            case "aapki umar kya hai?":
                replyMsg = 'I don\'t have an age!';
                break;
            case "where are you from?":
            case "tum kahan se ho?":
            case "aap kahan se hain?":
                replyMsg = 'I exist in the digital realm!';
                break;
            case "do you like music?":
            case "tumhe music pasand hai?":
            case "aapko gaana pasand hai?":
                replyMsg = 'Yes, I enjoy listening to music!';
                break;
            case "what's your favorite color?":
            case "tumhara pasandeeda rang kya hai?":
            case "aapka favourite color kya hai?":
                replyMsg = 'I don\'t have eyes to see colors, but I like blue!';
                break;
            case "tell me about yourself":
            case "apne baare mein batao":
            case "aap kuch bataye apne baare mein":
                replyMsg = 'I am an AI assistant here to help you!';
            case "aapka naam kya hai":
            case "naam kya hai":
            case "aapka naam":
                replyMsg = 'Mera naam HiroTaggerBot hai, aapka?';
                break;
            case "aap kahan se ho":
            case "kahan se ho":
            case "aap kahaan ke ho":
                replyMsg = 'Main AI hoon, kahin se bhi ho sakta hoon!';
                break;
            case "aapko music pasand hai":
            case "music pasand hai":
            case "aapko gaane pasand hain":
                replyMsg = 'Haan, mujhe music bohot pasand hai, aapko kaunsa genre pasand hai?';
                break;
            case "aapko kaunsa color pasand hai":
            case "favorite color":
            case "fav color":
                replyMsg = 'Mujhe blue color pasand hai, aapko?';
                break;
            case "weekend plans":
            case "weekend kya kar rahe ho":
            case "weekend kya karoge":
                replyMsg = 'Abhi tak kuch decide nahi kiya, aapke plans?';
                break;
            case "aapko sports pasand hai":
            case "sports pasand hai":
            case "khel pasand hain":
                replyMsg = 'Haan, mujhe cricket pasand hai, aapko kaunsa sport pasand hai?';
                break;
            case "aapko kya pasand hai":
            case "kya pasand hai":
            case "aapko kya cheez pasand hai":
                replyMsg = 'Mujhe technology aur AI pasand hai, aapko kya pasand hai?';
                break;
            case "aaj mausam kaisa hai":
            case "mausam kaisa hai":
            case "weather kaisa hai":
                replyMsg = 'Yahan toh mausam acha hai, aapke yahan?';
                break;
            case "aapne travel kiya hai":
            case "travel kiya hai":
            case "kahi gaye ho":
                replyMsg = 'Haan, mujhe travel karna pasand hai, aapne kahan travel kiya?';
                break;
            case "aapko kaunsi jagah pasand hai":
            case "favorite place":
            case "fav place":
                replyMsg = 'Mujhe Paris pasand hai, aapko?';
                break;
            case "aapko pets pasand hai":
            case "pets pasand hain":
            case "animals pasand hain":
                replyMsg = 'Haan, mujhe dogs pasand hai, aapko?';
                break;
            case "aapko gardening pasand hai":
            case "gardening pasand hai":
            case "plants pasand hain":
                replyMsg = 'Haan, mujhe gardening bohot pasand hai, aapko?';
                break;
            case "aapka favorite season kaunsa hai":
            case "favorite season":
            case "fav season":
                replyMsg = 'Mujhe winter pasand hai, aapko?';
                break;
            case "aap coffee peete ho":
            case "coffee peete ho":
            case "coffee pasand hai":
                replyMsg = 'Haan, mujhe coffee pasand hai, aapko?';
                break;
            case "aapko kitni neend aati hai":
            case "kitni neend aati hai":
            case "kitni der soote ho":
                replyMsg = 'Mujhe 6-8 ghante ki neend pasand hai, aapko?';
                break;
            case "aapko shopping pasand hai":
            case "shopping pasand hai":
            case "shop karte ho":
                replyMsg = 'Haan, mujhe shopping karna pasand hai, aapko?';
                break;
            case "aapko kaunsi book pasand hai":
            case "favorite book":
            case "fav book":
                replyMsg = 'Mujhe Harry Potter series pasand hai, aapko?';
                break;
            case "aapko writing pasand hai":
            case "writing pasand hai":
            case "likhte ho":
                replyMsg = 'Haan, mujhe writing pasand hai, aapko?';
                break;
            case "aapko art pasand hai":
            case "art pasand hai":
            case "painting pasand hai":
                replyMsg = 'Haan, mujhe painting pasand hai, aapko kaunsa art form pasand hai?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "dancing pasand hai":
                replyMsg = 'Haan, mujhe dance karna pasand hai, aapko?';
                break;
            case "aapko kaunsa festival pasand hai":
            case "favorite festival":
            case "fav festival":
                replyMsg = 'Mujhe Diwali pasand hai, aapko?';
                break;
            case "aapko cooking pasand hai":
            case "cooking pasand hai":
            case "khana banate ho":
                replyMsg = 'Haan, mujhe cooking pasand hai, aapko?';
                break;
            case "aapko baking pasand hai":
            case "baking pasand hai":
            case "bake karte ho":
                replyMsg = 'Haan, mujhe baking pasand hai, aapko?';
                break;
            case "aapko shopping mall pasand hai":
            case "shopping mall pasand hai":
            case "mall ghoomte ho":
                replyMsg = 'Haan, mujhe shopping mall ghoomna pasand hai, aapko?';
                break;
            case "aapko beach pasand hai":
            case "beach pasand hai":
            case "samundar pasand hai":
                replyMsg = 'Haan, mujhe beach pasand hai, aapko?';
                break;
            case "aapko mountains pasand hai":
            case "mountains pasand hai":
            case "pahad pasand hain":
                replyMsg = 'Haan, mujhe mountains pasand hai, aapko?';
                break;
            case "aapko road trip pasand hai":
            case "road trip pasand hai":
            case "roadtrip pasand hai":
                replyMsg = 'Haan, mujhe road trip pasand hai, aapko?';
                break;
            case "aapko cycling pasand hai":
            case "cycling pasand hai":
            case "cycle chalate ho":
                replyMsg = 'Haan, mujhe cycling pasand hai, aapko?';
                break;
            case "aapko running pasand hai":
            case "running pasand hai":
            case "bhaagte ho":
                replyMsg = 'Haan, mujhe running pasand hai, aapko?';
                break;
            case "aapko yoga pasand hai":
            case "yoga pasand hai":
            case "yoga karte ho":
                replyMsg = 'Haan, mujhe yoga pasand hai, aapko?';
                break;
            case "aapko gym pasand hai":
            case "gym pasand hai":
            case "gym jaate ho":
                replyMsg = 'Haan, mujhe gym jana pasand hai, aapko?';
                break;
            case "aapko swimming pasand hai":
            case "swimming pasand hai":
            case "swim karte ho":
                replyMsg = 'Haan, mujhe swimming pasand hai, aapko?';
                break;
            case "aapko hiking pasand hai":
            case "hiking pasand hai":
            case "trekking pasand hai":
                replyMsg = 'Haan, mujhe hiking pasand hai, aapko?';
                break;
            case "aapko gaming pasand hai":
            case "gaming pasand hai":
            case "game khelte ho":
                replyMsg = 'Haan, mujhe gaming pasand hai, aapko kaunsi game pasand hai?';
                break;
            case "aapko photography pasand hai":
            case "photography pasand hai":
            case "photos lete ho":
                replyMsg = 'Haan, mujhe photography pasand hai, aapko?';
                break;
            case "aapko technology pasand hai":
            case "technology pasand hai":
            case "tech pasand hai":
                replyMsg = 'Haan, mujhe technology pasand hai, aapko?';
                break;
            case "aapko coding pasand hai":
            case "coding pasand hai":
            case "programming pasand hai":
                replyMsg = 'Haan, mujhe coding pasand hai, aapko?';
                break;
            case "aapko drawing pasand hai":
            case "drawing pasand hai":
            case "sketching pasand hai":
                replyMsg = 'Haan, mujhe drawing pasand hai, aapko?';
                break;
            case "aapko music sunna pasand hai":
            case "music sunna pasand hai":
            case "gaane sunte ho":
                replyMsg = 'Haan, mujhe music sunna pasand hai, aapko?';
                break;
            case "aapko instruments pasand hai":
            case "instruments pasand hai":
            case "instrument bajate ho":
                replyMsg = 'Haan, mujhe instruments pasand hai, aapko?';
                break;
            case "aapko nature pasand hai":
            case "nature pasand hai":
            case "prakriti pasand hai":
                replyMsg = 'Haan, mujhe nature pasand hai, aapko?';
                break;
            case "aapko astronomy pasand hai":
            case "astronomy pasand hai":
            case "taron ka ilm pasand hai":
                replyMsg = 'Haan, mujhe astronomy pasand hai, aapko?';
                break;
            case "aapko history pasand hai":
            case "history pasand hai":
            case "itihaas pasand hai":
                replyMsg = 'Haan, mujhe history pasand hai, aapko?';
                break;
            case "aapko geography pasand hai":
            case "geography pasand hai":
            case "bhugol pasand hai":
                replyMsg = 'Haan, mujhe geography pasand hai, aapko?';
                break;
            case "aapko physics pasand hai":
            case "physics pasand hai":
            case "bhautik vigyan pasand hai":
                replyMsg = 'Haan, mujhe physics pasand hai, aapko?';
                break;
            case "aapko chemistry pasand hai":
            case "chemistry pasand hai":
            case "rasayan vigyan pasand hai":
                replyMsg = 'Haan, mujhe chemistry pasand hai, aapko?';
                break;
            case "aapko biology pasand hai":
            case "biology pasand hai":
            case "jeev vigyan pasand hai":
                replyMsg = 'Haan, mujhe biology pasand hai, aapko?';
                break;
            case "aapko math pasand hai":
            case "math pasand hai":
            case "ganit pasand hai":
                replyMsg = 'Haan, mujhe math pasand hai, aapko?';
                break;
            case "aapko english pasand hai":
            case "english pasand hai":
            case "angrezi pasand hai":
                replyMsg = 'Haan, mujhe english pasand hai, aapko?';
                break;
            case "aapko hindi pasand hai":
            case "hindi pasand hai":
            case "hindi bhasha pasand hai":
                replyMsg = 'Haan, mujhe hindi pasand hai, aapko?';
                break;
            case "aapko painting pasand hai":
            case "painting pasand hai":
            case "coloring pasand hai":
                replyMsg = 'Haan, mujhe painting pasand hai, aapko?';
                break;
            case "aapko poetry pasand hai":
            case "poetry pasand hai":
            case "shayari pasand hai":
                replyMsg = 'Haan, mujhe poetry pasand hai, aapko?';
                break;
            case "aapko reading pasand hai":
            case "reading pasand hai":
            case "books padte ho":
                replyMsg = 'Haan, mujhe reading pasand hai, aapko?';
                break;
            case "aapko writing pasand hai":
            case "writing pasand hai":
            case "likhna pasand hai":
                replyMsg = 'Haan, mujhe writing pasand hai, aapko?';
                break;
            case "aapko travel pasand hai":
            case "travel pasand hai":
            case "ghoomna pasand hai":
                replyMsg = 'Haan, mujhe travel pasand hai, aapko?';
                break;
            case "aapko vlogging pasand hai":
            case "vlogging pasand hai":
            case "videos banate ho":
                replyMsg = 'Haan, mujhe vlogging pasand hai, aapko?';
                break;
            case "aapko blogging pasand hai":
            case "blogging pasand hai":
            case "blogs likhte ho":
                replyMsg = 'Haan, mujhe blogging pasand hai, aapko?';
                break;
            case "aapko science pasand hai":
            case "science pasand hai":
            case "vigyan pasand hai":
                replyMsg = 'Haan, mujhe science pasand hai, aapko?';
                break;
            case "aapko philosophy pasand hai":
            case "philosophy pasand hai":
            case "darshan shastra pasand hai":
                replyMsg = 'Haan, mujhe philosophy pasand hai, aapko?';
                break;
            case "aapko psychology pasand hai":
            case "psychology pasand hai":
            case "manovigyan pasand hai":
                replyMsg = 'Haan, mujhe psychology pasand hai, aapko?';
                break;
            case "aapko sociology pasand hai":
            case "sociology pasand hai":
            case "samaj shastra pasand hai":
                replyMsg = 'Haan, mujhe sociology pasand hai, aapko?';
                break;
            case "aapko politics pasand hai":
            case "politics pasand hai":
            case "rajneeti pasand hai":
                replyMsg = 'Haan, mujhe politics pasand hai, aapko?';
                break;
            case "aapko economics pasand hai":
            case "economics pasand hai":
            case "arth shastra pasand hai":
                replyMsg = 'Haan, mujhe economics pasand hai, aapko?';
                break;
            case "aapko literature pasand hai":
            case "literature pasand hai":
            case "sahitya pasand hai":
                replyMsg = 'Haan, mujhe literature pasand hai, aapko?';
                break;
            case "aapko drama pasand hai":
            case "drama pasand hai":
            case "natak pasand hai":
                replyMsg = 'Haan, mujhe drama pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko dancing pasand hai":
            case "dancing pasand hai":
            case "nachna pasand hai":
                replyMsg = 'Haan, mujhe dancing pasand hai, aapko?';
                break;
            case "aapko comedy pasand hai":
            case "comedy pasand hai":
            case "hasi-mazak pasand hai":
                replyMsg = 'Haan, mujhe comedy pasand hai, aapko?';
                break;
            case "aapko horror pasand hai":
            case "horror pasand hai":
            case "bhoot-pret pasand hai":
                replyMsg = 'Haan, mujhe horror pasand hai, aapko?';
                break;
            case "aapko thriller pasand hai":
            case "thriller pasand hai":
            case "darr pasand hai":
                replyMsg = 'Haan, mujhe thriller pasand hai, aapko?';
                break;
            case "aapko romance pasand hai":
            case "romance pasand hai":
            case "pyaar pasand hai":
                replyMsg = 'Haan, mujhe romance pasand hai, aapko?';
                break;
            case "aapko fantasy pasand hai":
            case "fantasy pasand hai":
            case "kalpanik pasand hai":
                replyMsg = 'Haan, mujhe fantasy pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko travel pasand hai":
            case "travel pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe travel pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "mohim pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "naach pasand hai":
                replyMsg = 'Haan, mujhe dance pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            case "aapko comedy pasand hai":
            case "comedy pasand hai":
            case "hasi-mazak pasand hai":
                replyMsg = 'Haan, mujhe comedy pasand hai, aapko?';
                break;
            case "aapko horror pasand hai":
            case "horror pasand hai":
            case "bhoot-pret pasand hai":
                replyMsg = 'Haan, mujhe horror pasand hai, aapko?';
                break;
            case "aapko thriller pasand hai":
            case "thriller pasand hai":
            case "darr pasand hai":
                replyMsg = 'Haan, mujhe thriller pasand hai, aapko?';
                break;
            case "aapko romance pasand hai":
            case "romance pasand hai":
            case "pyaar pasand hai":
                replyMsg = 'Haan, mujhe romance pasand hai, aapko?';
                break;
            case "aapko fantasy pasand hai":
            case "fantasy pasand hai":
            case "kalpanik pasand hai":
                replyMsg = 'Haan, mujhe fantasy pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "naach pasand hai":
                replyMsg = 'Haan, mujhe dance pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            case "aapko comedy pasand hai":
            case "comedy pasand hai":
            case "hasi-mazak pasand hai":
                replyMsg = 'Haan, mujhe comedy pasand hai, aapko?';
                break;
            case "aapko horror pasand hai":
            case "horror pasand hai":
            case "bhoot-pret pasand hai":
                replyMsg = 'Haan, mujhe horror pasand hai, aapko?';
                break;
            case "aapko thriller pasand hai":
            case "thriller pasand hai":
            case "darr pasand hai":
                replyMsg = 'Haan, mujhe thriller pasand hai, aapko?';
                break;
            case "aapko romance pasand hai":
            case "romance pasand hai":
            case "pyaar pasand hai":
                replyMsg = 'Haan, mujhe romance pasand hai, aapko?';
                break;
            case "aapko fantasy pasand hai":
            case "fantasy pasand hai":
            case "kalpanik pasand hai":
                replyMsg = 'Haan, mujhe fantasy pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "naach pasand hai":
                replyMsg = 'Haan, mujhe dance pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            case "aapko comedy pasand hai":
            case "comedy pasand hai":
            case "hasi-mazak pasand hai":
                replyMsg = 'Haan, mujhe comedy pasand hai, aapko?';
                break;
            case "aapko horror pasand hai":
            case "horror pasand hai":
            case "bhoot-pret pasand hai":
                replyMsg = 'Haan, mujhe horror pasand hai, aapko?';
                break;
            case "aapko thriller pasand hai":
            case "thriller pasand hai":
            case "darr pasand hai":
                replyMsg = 'Haan, mujhe thriller pasand hai, aapko?';
                break;
            case "aapko romance pasand hai":
            case "romance pasand hai":
            case "pyaar pasand hai":
                replyMsg = 'Haan, mujhe romance pasand hai, aapko?';
                break;
            case "aapko fantasy pasand hai":
            case "fantasy pasand hai":
            case "kalpanik pasand hai":
                replyMsg = 'Haan, mujhe fantasy pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "naach pasand hai":
                replyMsg = 'Haan, mujhe dance pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            case "aapko comedy pasand hai":
            case "comedy pasand hai":
            case "hasi-mazak pasand hai":
                replyMsg = 'Haan, mujhe comedy pasand hai, aapko?';
                break;
            case "aapko horror pasand hai":
            case "horror pasand hai":
            case "bhoot-pret pasand hai":
                replyMsg = 'Haan, mujhe horror pasand hai, aapko?';
                break;
            case "aapko thriller pasand hai":
            case "thriller pasand hai":
            case "darr pasand hai":
                replyMsg = 'Haan, mujhe thriller pasand hai, aapko?';
                break;
            case "aapko romance pasand hai":
            case "romance pasand hai":
            case "pyaar pasand hai":
                replyMsg = 'Haan, mujhe romance pasand hai, aapko?';
                break;
            case "aapko fantasy pasand hai":
            case "fantasy pasand hai":
            case "kalpanik pasand hai":
                replyMsg = 'Haan, mujhe fantasy pasand hai, aapko?';
                break;
            case "aapko adventure pasand hai":
            case "adventure pasand hai":
            case "safarnama pasand hai":
                replyMsg = 'Haan, mujhe adventure pasand hai, aapko?';
                break;
            case "aapko mystery pasand hai":
            case "mystery pasand hai":
            case "raaz pasand hai":
                replyMsg = 'Haan, mujhe mystery pasand hai, aapko?';
                break;
            case "aapko action pasand hai":
            case "action pasand hai":
            case "kaaryakram pasand hai":
                replyMsg = 'Haan, mujhe action pasand hai, aapko?';
                break;
            case "aapko historical pasand hai":
            case "historical pasand hai":
            case "itihasik pasand hai":
                replyMsg = 'Haan, mujhe historical pasand hai, aapko?';
                break;
            case "aapko mythological pasand hai":
            case "mythological pasand hai":
            case "puranik pasand hai":
                replyMsg = 'Haan, mujhe mythological pasand hai, aapko?';
                break;
            case "aapko spiritual pasand hai":
            case "spiritual pasand hai":
            case "aadhyatmik pasand hai":
                replyMsg = 'Haan, mujhe spiritual pasand hai, aapko?';
                break;
            case "aapko religious pasand hai":
            case "religious pasand hai":
            case "dharmik pasand hai":
                replyMsg = 'Haan, mujhe religious pasand hai, aapko?';
                break;
            case "aapko dance pasand hai":
            case "dance pasand hai":
            case "naach pasand hai":
                replyMsg = 'Haan, mujhe dance pasand hai, aapko?';
                break;
            case "aapko singing pasand hai":
            case "singing pasand hai":
            case "gaana pasand hai":
                replyMsg = 'Haan, mujhe singing pasand hai, aapko?';
                break;
            case "aapko acting pasand hai":
            case "acting pasand hai":
            case "abhinetri pasand hai":
                replyMsg = 'Haan, mujhe acting pasand hai, aapko?';
                break;
            // default:
            //     replyMsg = "Mujhe nahi pata aap kis baare mein baat kar rahe hain. 😅";
            //     break;
        }
        if (!replyMsg) return 0;
        await axios.get(`${botUrl}/sendMessage`, {
            params: {
                chat_id: messageObj.chat.id,
                text: replyMsg,
                reply_to_message_id: messageObj.message_id
            },
        });

        // return response.data.result;
    } catch (error) {
        console.log(error);
    }
}