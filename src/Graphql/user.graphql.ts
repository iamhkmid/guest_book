import { gql } from "@apollo/client";


export const GUESTS = gql`
  query{
  guests {
    address
    createdAt
    description
    id
    name
    phoneNumber
    updatedAt
  }
}`

export const SUMMARY = gql`
query{
  summary {
    numberOfVisits {
      day
      week
      month
      year
    }
  }
}`

export const ADDGUEST= gql`
mutation($data: addGuestInput!){
  addGuest(data: $data){
    id
    name
    phoneNumber
    address
    description
  }
}`

export const DELETEGUEST = gql`
mutation($guestId: ID!){
  deleteGuest(guestId: $guestId){
    id
    name
  }
}
`

export const UPDATEGUEST = gql`
mutation($data: updateGuestInput!){
  updateGuest(data: $data) {
    id
    name
    address
    phoneNumber
    description
    createdAt
    updatedAt
  }
}`

export const PORTAL_INIT_GUEST_UPDATE = gql`
  query($guestId: ID!) {
    guest(guestId: $guestId) {
      name
      phoneNumber
      address
      description
    }
  }
`;