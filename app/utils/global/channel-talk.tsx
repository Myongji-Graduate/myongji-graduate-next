'use client';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';

export default function ChannelTalk() {
  if (typeof window !== 'undefined') {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN ?? '',
    });
  }
  return <></>;
}
