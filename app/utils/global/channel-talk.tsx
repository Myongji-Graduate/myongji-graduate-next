'use client';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

let channelTalkDidInit = false;

export default function ChannelTalk() {
  if (typeof window !== 'undefined' && !channelTalkDidInit) {
    channelTalkDidInit = true;
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN ?? '',
    });
  }

  return null;
}
