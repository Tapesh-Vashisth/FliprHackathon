import React from 'react'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share"

const SocialSharing = (url: string, type: string) => {
  return (
    <div 
        style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            padding: "20px",
            border: "1px solid green"
        }}
    >
        <FacebookShareButton
            url={url}
            quote={`Check out my ${type}!!`}
            hashtag="#parisisthebest"
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
            url={url}
            hashtags={["trip", "itinerary", "planningahead"]}
            title={`Check out my ${type}!!`}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
            url={url}
            title={`Check out my ${type}`}
            separator=' : '
        >
            <WhatsappIcon size={32} round />
        </WhatsappShareButton>
    </div>
  )
}

export default SocialSharing