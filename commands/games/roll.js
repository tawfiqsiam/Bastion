/**
 * @file roll command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  let outcomes = [
    ':one:',
    ':two:',
    ':three:',
    ':four:',
    ':five:',
    ':six:'
  ];
  let outcome = outcomes.getRandom();

  if (args[0] && parseInt(args[0])) {
    args[0] = parseInt(args[0]);
    if (args[0] > 10) {
      args[0] = 50;
    }
    for (let i = 1; i < args[0]; i++) {
      outcome += outcomes.getRandom();
    }
  }

  await message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      title: 'You rolled:',
      description: outcome
    }
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'roll',
  description: 'Rolls the specified amount of dice and shows you the outcomes.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'roll [no_of_dice]',
  example: [ 'roll', 'roll 5' ]
};
