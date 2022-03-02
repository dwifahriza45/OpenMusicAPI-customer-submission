require('dotenv').config();
const amqp = require('amqplib');
const SongService = require('./SongsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const songService = new SongService();
  const mailSender = new MailSender();
  const listener = new Listener(songService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:songs', {
    durable: true,
  });

  channel.consume('export:songs', listener.listen, { noAck: true });
  console.log(`Consumer berjalan pada ${process.env.RABBITMQ_SERVER}`);
};
init();
