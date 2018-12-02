const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone:  true});

bot.on("ready", async () => {
  console.log(`${bot.user.name} is online!`)
  bot.user.setActivity("RtzFurry Bot")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user - Creator:RtzFurry.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#00ffe9")
    .addField("Reported User", `${rUser} With ID: ${rUser.id}`)
    .addField("Reporter", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel - Creator:RtzFurry.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nope, Permission Require");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Too OP To Get Kick");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#731dba")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, `botlog`);
  if(!kickChannel) return message.channel.send("Can't find botlog channel");

  message.delete().catch(O_o=>{});
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;

}

if(cmd === `${prefix}ban`){

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Nope, Permission Require");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Too OP To Get Ban");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Banned")
  .setColor("#ff0000")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let banChannel = message.guild.channels.find(`name`, `botlog`);
  if(!banChannel) return message.channel.send("Can't find botlog channel");

  message.delete().catch(O_o=>{});
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);

  return;
}

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#00ffe9")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}commands`){

    let commander = new Discord.RichEmbed()
    .setDescription("All Commands")
    .setColor("#00ffe9")
    .setDescription("Prefix is [*] | commands,report,serverinfo,botinfo")

    return message.channel.send(commander);
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.iconURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information - Created By RtzFurry")
    .setColor("#00ffe9")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)

    return message.channel.send(botembed);
  }

});

bot.login(botconfig.token);
