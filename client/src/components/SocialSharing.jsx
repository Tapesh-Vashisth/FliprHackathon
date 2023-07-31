import React from 'react'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share"

const SocialSharing = (props) => {
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
        <h4 style={{padding: '20px'}}>Share this!</h4>
        <FacebookShareButton
            url={props.url}
            quote={`Check out my ${props.type}!!`}
            hashtag="#parisisthebest"
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
            url={props.url}
            hashtags={["trip", "itinerary", "planningahead"]}
            title={`Check out my ${props.type}!!`}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
            url={props.url}
            title={`Check out my ${props.type}`}
            separator=' : '
        >
            <WhatsappIcon size={32} round />
        </WhatsappShareButton>
    </div>
  )
}

export default SocialSharing