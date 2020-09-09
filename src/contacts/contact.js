import React from "react";

const Contact = (props) => (
				<tr>
					<td>{props.firstName}</td>
					<td>{props.lastName}</td>
					<td>{props.phone}</td>
					<td>{props.gender}</td>
				</tr>
)

export default Contact;