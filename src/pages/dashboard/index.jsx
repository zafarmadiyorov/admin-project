import { Card, Col, Row, Skeleton, Typography } from 'antd'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useLoad } from '../../hooks/request'
import { bannerList, brandsList, categoriesList, productsList } from '../../constants/urls'

function Dashboard() {
  const { response: products, loading: productsLoading } = useLoad({ url: productsList })
  const { response: categories, loading: categoriesLoading } = useLoad({ url: categoriesList })
  const { response: banner, loading: bannerLoading } = useLoad({ url: bannerList })
  const { response: brands, loading: brandsLoading } = useLoad({ url: brandsList })

  let content = [
    {
      id: 1,
      title: 'Total products',
      loading: productsLoading,
      value: products?.length
    },
    {
      id: 2,
      title: 'Total categories',
      loading: categoriesLoading,
      value: categories?.length
    },
    {
      id: 3,
      title: 'Total banner',
      loading: bannerLoading,
      value: banner?.length
    },
    {
      id: 4,
      title: 'Total brands',
      loading: brandsLoading,
      value: brands?.length
    },
  ]

  return (
    <div>
      <Typography.Title>Dashboard</Typography.Title>
      <Row gutter={[12, 12]}>
        {
          content.map(({ id, title, loading, value }) => (
            <Col span={6} key={id}>
              <Card>
                <Typography.Title level={3}>{title}</Typography.Title>
                <Skeleton active paragraph={false} loading={loading} >
                  <Typography.Paragraph style={{ fontSize: 18 }}>{value}</Typography.Paragraph>
                </Skeleton>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Dashboard