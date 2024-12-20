import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  MediaCard,
  TextField,
  FormLayout
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { Link as PolarisLink } from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return json({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  });
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page> 
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500"> 
                  <Text as="h2" variant="headingMd">
                    Welcome 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    We enable the voice search option to your search box.
                  </Text> 
              </BlockStack> 
            </Card>
          </Layout.Section>

          {/* <Layout.Section>
           <Card>
            <BlockStack gap="300">
                 <Text as="h3" variant="headingMd">
                    Get started 
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Activate the app from the customizer.
                  </Text>
                  <a id="theme_link"
                    href={`https://admin.shopify.com/store/${process.env.SHOPIFY_STORE_HANDLE}/themes/current/editor?context=apps&handle=voice-search-app`}
                  >
                    <Button variant="primary">Open Theme Customizer</Button>
                  </a>
            </BlockStack>
          </Card>
          
        </Layout.Section> */}


          <Layout.Section>
           <Card>
            <BlockStack gap="300">
            <Text as="p" variant="bodyMd">
                    Click the button to see setup instructions.
                  </Text>
                    <PolarisLink  url="/app/additional" >
                      <Button variant="primary">Learn how to Setup</Button>
                    </PolarisLink>
            </BlockStack>
          </Card>
        </Layout.Section>
          
            <Layout.Section >
             <BlockStack gap="500">  
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Features</Text>
                    <ul as="h3">
                    <li>Provide an advanced voice search feature for enhanced user experience.</li>
                    <li>Share important details with customers through verbal announcements.</li>
                    <li>Tailor the widget design to match your store's branding and theme.</li>
                    <li>Offer audio instructions for a more inclusive shopping experience.</li>
                    <li>Effortlessly integrate the voice search functionality into your store.</li>
                    </ul>
                   
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>

          <Layout.Section variant="oneThird"> 
            <Card> 
              <img
                alt="RVS"
                width="100%"
                height="100%"
                style={{objectFit: 'cover', objectPosition: 'center'}}
                src="https://cdn.shopify.com/s/files/1/0847/6488/5320/files/1500x1500.png"
              />  
              </Card> 
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
