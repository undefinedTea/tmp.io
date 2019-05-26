import { EventHubClient, EventPosition } from '@azure/event-hubs'
const data = async () => {
  const client = await EventHubClient.createFromIotHubConnectionString(process.env.IOT_HUB!)
  const information = await client.getPartitionIds()

  client.receive('0', (messageData) => {
    console.log('message: ', messageData.body.data)
  }, (err) => {
    console.log('partition 0 message error: ', err)
  }, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) })
}

data().catch(err => {
  console.log('error: ', err)
})
