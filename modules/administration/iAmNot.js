/*
 * Copyright (C) 2017 Sankarsan Kampa
 *                    https://sankarsankampa.com/contact
 *
 * This file is a part of Bastion Discord BOT.
 *                        https://github.com/snkrsnkampa/Bastion
 *
 * This code is licensed under the SNKRSN Shared License. It is free to
 * download, copy, compile, use, study and refer under the terms of the
 * SNKRSN Shared License. You can modify the code only for personal or
 * internal use only. However, you can not redistribute the code without
 * explicitly getting permission fot it.
 *
 * Bastion BOT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY. See the SNKRSN Shared License for
 * more details.
 *
 * You should have received a copy of the SNKRSN Shared License along
 * with this program. If not, see <https://github.com/snkrsnkampa/Bastion/LICENSE>.
 */

const sql = require('sqlite');
sql.open('./data/Bastion.sqlite');

exports.run = (Bastion, message, args) => {
  if (args.length < 1) return;

  sql.get(`SELECT selfAssignableRoles FROM guildSettings WHERE guildID=${message.guild.id}`).then(row => {
    if (!row) return;

    role = message.guild.roles.find('name', args.join(' '));
    if (role == null) return;
    selfAssignableRoles = JSON.parse(row.selfAssignableRoles);
    if (!selfAssignableRoles.includes(role.id)) return;

    message.guild.members.get(message.author.id).removeRole(role).then(() => {
      message.channel.sendMessage('', {embed: {
        color: 5088314,
        description: `${message.author}, you have been removed from **${role.name}** role.`,
      }}).catch(e => {
        Bastion.log.error(e.stack);
      });
    }).catch(e => {
      Bastion.log.error(e.stack);
      message.channel.sendMessage('', {embed: {
        color: 13380644,
        description: 'I don\'t have enough permission to do that operation.'
      }}).catch(e => {
        Bastion.log.error(e.stack);
      });
    });
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: ['idontwant', 'idonthave']
};

exports.help = {
  name: 'iamnot',
  description: 'Removes a specified self assignable role from the user.',
  permission: '',
  usage: 'iAmNot <role name>',
  example: ['iAmNot Looking to play']
};