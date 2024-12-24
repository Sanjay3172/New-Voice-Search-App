//import { useState } from 'react';
import {
  Box,
  Card,
  Layout,
  Button,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  MediaCard,
  VideoThumbnail,
  Modal,
  Frame
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Link as PolarisLink } from "@shopify/polaris";
export default function AdditionalPage() {
  // State to control the modal visibility
  //const [active, setActive] = useState(false); // Initialize the active state 
  // Function to toggle the modal visibility
  //const handleChange = () => setActive((prevActive) => !prevActive);
  return (
    <Page>
      <TitleBar title="Learn How To Setup" /> 
      
      <Card gap="300">
      <BlockStack >
        {/* <Text as="h2" variant="bodyMd">
         Click button to go back to Dashboard
        </Text> */}
        <PolarisLink  url="/app" >
          <Button variant="primary">Back to Dashboard</Button>
        </PolarisLink>
         
        </BlockStack>
      </Card> 
        
      <Layout gap="300">
        {/* <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section> */}

        <Frame>
          <Layout.Section gap="500">
            <MediaCard
              portrait
              title="See the video on how to enable the app from the theme."
              description="In this video, you’ll learn how you can integrate the app within a theme after installation."
            >
              <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <video
                  controls
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  src="https://cdn.shopify.com/videos/c/o/v/ec47b01932834a1e877ec0e934bfe1d9.mp4"
                />
              </div>
            </MediaCard>
          </Layout.Section>
        </Frame>

      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
