import React from "react"
import { withRouter } from "react-router-dom"
import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap"
import Avatar from "../../components/Avatar"
import { avatarURL } from "../../utils/requests"
import Icon from "../../components/icon"
import Locale from "../../locale"

class CreatorCard extends React.Component {
	render() {
		const {
			creator,
			history,
			cardTitle = Locale.projectPage.creator
		} = this.props
		const { title, username } = creator
		const getName = ({ firstName, lastName, username }) => {
			if (!firstName && !lastName) return username
			return `${firstName} ${lastName}`
		}
		const displayName = getName(creator)
		return (
			<Card
				inverse
				color="secondary"
				style={style.container}
				onClick={() => history.push(`/user/${username}`)}
				body>
				<CardTitle>
					<Icon name="user" /> {cardTitle}
				</CardTitle>
				<CardText>
					<Container>
						<Row>
							<Col md="2">
								<Avatar size={32} user={creator} />
							</Col>
							<Col md="10">
								<Row>
									<Col>
										<b>{displayName}</b>
									</Col>
								</Row>
								{title && (
									<Row>
										<Col>{title}</Col>
									</Row>
								)}
							</Col>
						</Row>
					</Container>
				</CardText>
			</Card>
		)
	}
}

export default withRouter(CreatorCard)

const style = {
	container: {
		cursor: "pointer",
		marginTop: 8
	}
}
