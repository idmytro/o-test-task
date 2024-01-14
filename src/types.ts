export type ContactData = {
  id: number
  name: string
  img: string
  position: string
  city: string
  created_at: number
  _orbits_last_message: {
    message_head: string
    message: string
  }
}

export type ContactItem = {
  contact_date: string
  array: ContactData[]
}

export type ContactItemWithFormattedDate = ContactItem & {
  formatted_date: string
}
