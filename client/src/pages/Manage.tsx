import React from 'react'
import { useLocation } from 'react-router';

type Props = {}

export default function AdminManage({}: Props) {
  const {state} = useLocation();

  console.log(state)
  return (
    <div>Admin-Manage</div>
  )
}