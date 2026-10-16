import React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  item?: string
  className?: string
  name?: string
  email?: string
  phone?: string
  message?: string
}

const Email = ({ item, className, name, email, phone, message }: Props) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>HER NEXT 수강 신청서가 도착했습니다</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HER NEXT</Text>
        <Heading style={heading}>새 수강 신청서가 도착했습니다</Heading>
        <Section style={card}>
          <Text style={label}>신청 과정</Text>
          <Text style={value}>{item || '-'}</Text>
          {className && (
            <>
              <Text style={label}>반</Text>
              <Text style={value}>{className}</Text>
            </>
          )}
          <Text style={label}>이름</Text>
          <Text style={value}>{name || '이름 없음'}</Text>
          <Text style={label}>이메일</Text>
          <Text style={value}>{email || '이메일 없음'}</Text>
          <Text style={label}>연락처</Text>
          <Text style={value}>{phone || '-'}</Text>
          {message && (
            <>
              <Text style={label}>메시지</Text>
              <Text style={value}>{message}</Text>
            </>
          )}
        </Section>
        <Text style={foot}>
          이 메일에 바로 답장하면 신청자에게 연결됩니다. 확인 연락과 결제 안내를 보내주세요. hernextschool.com 수강 신청서에서 접수되었습니다.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `[HER NEXT] 수강 신청 — ${data.name || '신청자'}${data.className ? ` · ${data.className}` : ''}`,
  displayName: '수강 신청 알림',
  previewData: {
    item: '4주 AI 클래스 · 초급반 ($499)',
    className: '11/16 월요일 오전반',
    name: '김지현',
    email: 'jihyun@example.com',
    phone: '+1 201 000 0000',
    message: 'AI를 처음 배워요.',
  },
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
const value = { color: '#111111', fontSize: '16px', margin: '0 0 4px', whiteSpace: 'pre-wrap' as const }
const foot = { color: '#8a7f74', fontSize: '12px', marginTop: '24px', lineHeight: '1.6' }
