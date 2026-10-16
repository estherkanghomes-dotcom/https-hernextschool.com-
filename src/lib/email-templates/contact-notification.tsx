import React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
}

const Email = ({ name, email }: Props) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>HER NEXT 무료 상담 신청이 도착했습니다</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HER NEXT</Text>
        <Heading style={heading}>새 상담 신청이 도착했습니다</Heading>
        <Section style={card}>
          <Text style={label}>이름</Text>
          <Text style={value}>{name || '이름 없음'}</Text>
          <Text style={label}>이메일</Text>
          <Text style={value}>{email || '이메일 없음'}</Text>
        </Section>
        <Text style={foot}>
          이 메일에 바로 답장하면 신청자에게 연결됩니다. hernextschool.com 문의 폼에서 접수되었습니다.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `[HER NEXT] 새 상담 신청 — ${data.name || '신청자'}`,
  displayName: '상담 신청 알림',
  previewData: { name: '김지현', email: 'jihyun@example.com' },
  to: 'esther@hernextschool.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 25px', maxWidth: '560px' }
const eyebrow = {
  color: '#e2231a',
  fontSize: '12px',
  letterSpacing: '3px',
  fontWeight: 'bold' as const,
  margin: '0 0 8px',
}
const heading = { color: '#111111', fontSize: '24px', margin: '0 0 20px' }
const card = {
  backgroundColor: '#f4f4f2',
  borderRadius: '12px',
  padding: '20px 24px',
}
const label = {
  color: '#e2231a',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '12px 0 2px',
}
const value = { color: '#111111', fontSize: '16px', margin: '0 0 4px' }
const foot = { color: '#8a7f74', fontSize: '12px', marginTop: '24px', lineHeight: '1.6' }
